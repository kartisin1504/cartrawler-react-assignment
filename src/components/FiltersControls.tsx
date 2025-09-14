import React from 'react'

type Opt = string
type SortKey = 'price' | 'vendor' | 'seats'

interface Props {
  favCount: number
  labels: {
    favourites: string
    sortBy: string
    price: string
    vendor: string
    seats: string
    fuel: string
    transmission: string
    minSeats: string
  }
  sortBy: SortKey
  setSortBy: (v: SortKey) => void
  fuel: string
  setFuel: (v: string) => void
  gear: string
  setGear: (v: string) => void
  minSeats: string
  setMinSeats: (v: string) => void
  fuelOptions: Opt[]
  gearOptions: Opt[]
  seatOptions: Opt[]
}

export default function FiltersControls({
  favCount,
  labels,
  sortBy,
  setSortBy,
  fuel,
  setFuel,
  gear,
  setGear,
  minSeats,
  setMinSeats,
  fuelOptions,
  gearOptions,
  seatOptions,
}: Props) {
  return (
    <div className="controls" role="region" aria-label="List controls">
      <span className="badge">
        {labels.favourites}: {favCount}
      </span>

      <div className="control">
        <label htmlFor="sort">{labels.sortBy}</label>
        <select
          id="sort"
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
        >
          <option value="price">{labels.price} (default)</option>
          <option value="vendor">{labels.vendor}</option>
          <option value="seats">{labels.seats}</option>
        </select>
      </div>

      <div className="control">
        <label htmlFor="fuel">{labels.fuel}</label>
        <select id="fuel" className="select" value={fuel} onChange={(e) => setFuel(e.target.value)}>
          {fuelOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="gear">{labels.transmission}</label>
        <select id="gear" className="select" value={gear} onChange={(e) => setGear(e.target.value)}>
          {gearOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="seats">{labels.minSeats}</label>
        <select
          id="seats"
          className="select"
          value={minSeats}
          onChange={(e) => setMinSeats(e.target.value)}
        >
          {seatOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
