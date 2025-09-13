import { render, screen, within } from '@testing-library/react'
import FareRulesModal from './FareRulesModal'

describe('FareRulesModal', () => {
  it('shows rules when open', () => {
    render(
      <FareRulesModal
        open={true}
        onClose={jest.fn()}
        rules={{
          fuelPolicy: 'Full-to-full',
          cancellation: { freeUntilHours: 24, feeAfter: '50 USD' },
        }}
      />
    )

    const dialog = screen.getByRole('dialog')
    // Find the <p> that starts with "Fuel:" and assert full content
    const fuelP = within(dialog).getByText(/Fuel:/i)
    expect(fuelP).toHaveTextContent(/Fuel:/i)

    const cancellationP = within(dialog).getByText(/Cancellation:/i)
    expect(cancellationP).toHaveTextContent(/Cancellation:/i)
  })

  it('is hidden when not open', () => {
    render(<FareRulesModal open={false} onClose={jest.fn()} rules={null} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
