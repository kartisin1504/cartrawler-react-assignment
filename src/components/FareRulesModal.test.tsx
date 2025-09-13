import { render, screen } from '@testing-library/react'
import FareRulesModal from './FareRulesModal'

describe('FareRulesModal', () => {
  it('shows rules when open', () => {
    render(
      <FareRulesModal
        open={true}
        onClose={jest.fn()}
        rules={{ fuelPolicy: 'Full-to-full', cancellation: { freeUntilHours: 24, feeAfter: '50 USD' } }}
      />
    )
    expect(screen.getByText(/Fuel: Full-to-full/)).toBeInTheDocument()
    expect(screen.getByText(/Cancellation:/)).toBeInTheDocument()
  })

  it('is hidden when not open', () => {
    render(<FareRulesModal open={false} onClose={jest.fn()} rules={null} />)
    expect(screen.queryByText(/Fare rules/)).not.toBeInTheDocument()
  })
})
