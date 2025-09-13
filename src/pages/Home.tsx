import React, { useEffect, useMemo, useState } from 'react'
import {
  flattenCars, legendFromCore, fetchFeedWithFallback, parseSeatMin, formatDateTime,
} from '../utils'
import type { Car, Legend } from '../types'
import { useFavourites } from '../hooks/useFavourites'
import SkeletonCard from '../components/SkeletonCard'
import { useI18n } from '../context/I18nContext'
import LegendBar from '../components/Legend'
import FiltersControls from '../components/FiltersControls'
import CarCard from '../components/CarCard'

const SORTS = {
  price: (a: Car, b: Car) => a.price - b.price,
  vendor: (a: Car, b: Car) => a.vendor.localeCompare(b.vendor),
  seats: (a: Car, b: Car) => {
    const am = parseSeatMin(String(a.passengerQuantity || ''))
    const bm = parseSeatMin(String(b.passengerQuantity || ''))
    return am.min - bm.min
  },
}

export default function Home() {
  const { t } = useI18n()
  const [feed, setFeed] = useState<any | null>(null)
  const [cars, setCars] = useState<Car[]>([])
  const [sortBy, setSortBy] = useState<keyof typeof SORTS>('price')
  const [legend, setLegend] = useState<Legend | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fav = useFavourites()

  const [fuel, setFuel] = useState<string>('all')
  const [gear, setGear] = useState<string>('all')
  const [minSeats, setMinSeats] = useState<string>('all')

  useEffect(() => {
    async function load() {
      try {
        const json = await fetchFeedWithFallback()
        if (!json) throw new Error('No feed found')
        setFeed(Array.isArray(json) ? json[0] : json) // handles array-wrapped feeds
        setLoading(false)
      } catch (e) {
        setError('Place a local copy of cars.json into the public/ folder to run offline.')
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (feed) {
      setLegend(legendFromCore(feed?.VehAvailRSCore))
      const flat = flattenCars(feed?.VehAvailRSCore?.VehVendorAvails || [])
      setCars(flat.sort(SORTS[sortBy]))
    }
  }, [feed])

  const fuelOptions = useMemo(
    () => ['all', ...Array.from(new Set(cars.map((c) => String(c.fuelType || '—'))))],
    [cars],
  )
  const gearOptions = useMemo(
    () => ['all', ...Array.from(new Set(cars.map((c) => String(c.transmission || '—'))))],
    [cars],
  )
  const seatOptions = useMemo(() => {
    const s = new Set<string>()
    cars.forEach(c => s.add(String(c.passengerQuantity || '0')))
    const arr = Array.from(s)
    arr.sort((a, b) => parseSeatMin(a).min - parseSeatMin(b).min)
    return ['all', ...arr]
  }, [cars])

  const view = useMemo(() => {
    let list = [...cars]
    if (fuel !== 'all') list = list.filter((c) => String(c.fuelType || '') === fuel)
    if (gear !== 'all') list = list.filter((c) => String(c.transmission || '') === gear)
      if (minSeats !== 'all') {
        list = list.filter((c) => {
          const seatVal = String(c.passengerQuantity || '')
          // exact match: if user selected "5+", only cars with "5+" pass
          if (minSeats.endsWith('+')) {
            return seatVal === minSeats
          }
          // otherwise numeric compare
          const req = parseInt(minSeats, 10)
          const { min: carMin } = parseSeatMin(seatVal)
          return !isNaN(req) ? carMin >= req : true
        })
      }
      
    return list.sort(SORTS[sortBy])
  }, [cars, fuel, gear, minSeats, sortBy])

  if (!feed) {
    return (
      <div>
        <h1>{t.availableCars}</h1>
        {error && (
          <div className="legend" style={{ borderColor: '#ffcccc', background: '#fff8f8' }}>
            {error}
          </div>
        )}
        <p>
          {t.downloadFeedMsg}{' '}
          <a href="https://ajaxgeo.cartrawler.com/ctabe/cars.json" target="_blank" rel="noreferrer">
            this URL
          </a>
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>{t.availableCars}</h1>

      {legend && (
        <LegendBar
          legend={legend}
          pickupLabel={t.pickup}
          returnLabel={t.return}
          format={formatDateTime}
        />
      )}

      <FiltersControls
        favCount={fav.count}
        labels={{
          favourites: t.favourites,
          sortBy: t.sortBy,
          price: t.price,
          vendor: t.vendor,
          seats: t.seats,
          fuel: t.fuel,
          transmission: t.transmission,
          minSeats: t.minSeats,
        }}
        sortBy={sortBy}
        setSortBy={setSortBy as any}
        fuel={fuel}
        setFuel={setFuel}
        gear={gear}
        setGear={setGear}
        minSeats={minSeats}
        setMinSeats={setMinSeats}
        fuelOptions={fuelOptions}
        gearOptions={gearOptions}
        seatOptions={seatOptions}
      />

      <section className="grid" aria-live="polite">
        {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading && (
          <>
            {view.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                labels={{
                  passengers: t.passengers,
                  bags: t.bags,
                  doors: t.doors,
                  transmission: t.transmission,
                  airCon: t.airCon,
                  view: t.view,
                }}
                isFav={fav.isFav}
                toggleFav={fav.toggle}
              />
            ))}
            {!view.length && <p>{t.noMatches}</p>}
          </>
        )}
      </section>
    </div>
  )
}
