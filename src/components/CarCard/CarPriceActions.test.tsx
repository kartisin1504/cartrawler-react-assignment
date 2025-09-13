import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CarPriceActions } from './CarPriceActions'
import type { Car } from '../../types'

// mock getFareRules so we can control success/error
const mockGetFareRules = jest.fn()
jest.mock('../../utils', () => ({
  __esModule: true,
  getFareRules: (...args: any[]) => (mockGetFareRules as any)(...args),
}))

// mock the modal here to assert props easily (we’ll use the real modal in the integration test)
jest.mock('../FareRulesModal', () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="fare-rules-modal"
      data-open={props.open ? 'true' : 'false'}
      data-loading={props.loading ? 'true' : 'false'}
      data-error={props.error || ''}
    />
  ),
}))

const mkCar = (overrides: Partial<Car> = {}): Car => ({
  id: '1',
  vendor: 'ALAMO',
  name: 'Toyota Rav4 or similar',
  code: 'IFAR', // SIPP, used for rules key
  airConditionInd: true,
  transmission: 'Automatic',
  fuelType: 'Petrol',
  driveType: 'Unspecified',
  passengerQuantity: '5+',
  baggageQuantity: '3',
  doors: '5',
  pictureURL: '/img.png',
  price: 123.45,
  currency: 'USD',
  ...overrides,
})

describe('CarPriceActions – unit', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders INACTIVE favourite (title "Save") and toggles on click', () => {
    const isFav = jest.fn().mockReturnValue(false)
    const toggleFav = jest.fn()

    render(
      <MemoryRouter>
        <CarPriceActions car={mkCar()} isFav={isFav} toggleFav={toggleFav} viewLabel="View" />
      </MemoryRouter>
    )

    const favBtn = screen.getByRole('button', { name: /toggle favourite/i })
    expect(favBtn).toHaveClass('fav-btn')
    expect(favBtn).not.toHaveClass('active')
    expect(favBtn).toHaveAttribute('title', 'Save')  // ↔ lines 26–36 covered

    fireEvent.click(favBtn)
    expect(toggleFav).toHaveBeenCalledWith('1')
  })

  it('renders ACTIVE favourite (title "Saved")', () => {
    const isFav = jest.fn().mockReturnValue(true)

    render(
      <MemoryRouter>
        <CarPriceActions car={mkCar()} isFav={isFav} toggleFav={jest.fn()} viewLabel="View" />
      </MemoryRouter>
    )

    const favBtn = screen.getByRole('button', { name: /toggle favourite/i })
    expect(favBtn).toHaveClass('active')              // ↔ lines 26–36 covered
    expect(favBtn).toHaveAttribute('title', 'Saved')  // ↔ lines 26–36 covered
  })

  it('opens Fare rules (aria-expanded toggles) and calls getFareRules(vendor, code)', async () => {
    mockGetFareRules.mockResolvedValueOnce(null)

    render(
      <MemoryRouter>
        <CarPriceActions car={mkCar()} isFav={() => false} toggleFav={jest.fn()} viewLabel="View" />
      </MemoryRouter>
    )

    const btn = screen.getByRole('button', { name: /fare rules/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')

    await waitFor(() => {
      expect(mockGetFareRules).toHaveBeenCalledWith('ALAMO', 'IFAR')
    })

    // modal mock props after load
    const modal = screen.getByTestId('fare-rules-modal')
    await waitFor(() => expect(modal).toHaveAttribute('data-loading', 'false'))
  })

  it('shows error when getFareRules rejects', async () => {
    mockGetFareRules.mockRejectedValueOnce(new Error('network'))

    render(
      <MemoryRouter>
        <CarPriceActions car={mkCar()} isFav={() => false} toggleFav={jest.fn()} viewLabel="View" />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /fare rules/i }))
    const modal = await screen.findByTestId('fare-rules-modal')

    await waitFor(() => {
      expect(modal).toHaveAttribute('data-loading', 'false')
      expect(modal).toHaveAttribute('data-error', 'No fare rules available for this rate.')
    })
  })

  it('renders View link with correct aria-label and amount text', () => {
    render(
      <MemoryRouter>
        <CarPriceActions car={mkCar()} isFav={() => false} toggleFav={jest.fn()} viewLabel="View" />
      </MemoryRouter>
    )

    expect(screen.getByText(/USD 123\.45/)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /View details for Toyota Rav4 or similar/i })
    ).toBeInTheDocument()
  })
})
