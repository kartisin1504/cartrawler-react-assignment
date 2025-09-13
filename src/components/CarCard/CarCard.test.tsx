import { render, screen, fireEvent } from '@testing-library/react'
import CarCard from './index'
import type { Car } from '../../types'
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'

const mockCar: Car = {
  id: '1',
  vendor: 'ALAMO',
  vendorCode: '125',
  name: 'Toyota Rav4 or similar',
  code: 'IFAR',
  codeContext: 'CARTRAWLER',
  airConditionInd: true,
  transmission: 'Automatic',
  fuelType: 'Petrol',
  driveType: 'Unspecified',
  passengerQuantity: '5+',
  baggageQuantity: '3',
  doors: '5',
  pictureURL: '/test.png',
  price: 100,
  currency: 'USD',
}

describe('CarCard', () => {
  it('renders car details', () => {
    render(
      <MemoryRouter>
        <CarCard
          car={mockCar}
          labels={{
            passengers: 'Passengers',
            bags: 'Bags',
            doors: 'Doors',
            transmission: 'Transmission',
            airCon: 'AirCon',
            view: 'View',
          }}
          isFav={() => false}
          toggleFav={jest.fn()}
        />
      </MemoryRouter>
    )

    expect(screen.getByText(/Toyota Rav4/)).toBeInTheDocument()
    expect(screen.getByText(/USD 100\.00/)).toBeInTheDocument()
  })

  it('handles favourite toggle', () => {
    const toggle = jest.fn()
    render(
      <MemoryRouter>
        <CarCard
          car={mockCar}
          labels={{
            passengers: 'Passengers',
            bags: 'Bags',
            doors: 'Doors',
            transmission: 'Transmission',
            airCon: 'AirCon',
            view: 'View',
          }}
          isFav={() => false}
          toggleFav={toggle}
        />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /toggle favourite/i }))
    expect(toggle).toHaveBeenCalledWith('1')
  })
})

