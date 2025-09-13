import { render, screen, fireEvent } from '@testing-library/react'
import FiltersControls from './FiltersControls'

describe('FiltersControls', () => {
  it('renders and updates sortBy', () => {
    const setSortBy = jest.fn()
    render(
      <FiltersControls
        favCount={2}
        labels={{
          favourites: 'Favourites',
          sortBy: 'Sort by',
          price: 'Price',
          vendor: 'Vendor',
          seats: 'Seats',
          fuel: 'Fuel',
          transmission: 'Transmission',
          minSeats: 'Min seats',
        }}
        sortBy="price"
        setSortBy={setSortBy}
        fuel="all"
        setFuel={jest.fn()}
        gear="all"
        setGear={jest.fn()}
        minSeats="all"
        setMinSeats={jest.fn()}
        fuelOptions={['all', 'Petrol']}
        gearOptions={['all', 'Automatic']}
        seatOptions={['all', '5', '5+']}
      />
    )

    expect(screen.getByText(/Favourites: 2/)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Sort by/), { target: { value: 'vendor' } })
    expect(setSortBy).toHaveBeenCalledWith('vendor')
  })
})
