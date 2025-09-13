import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Car } from '../types'
import { useFavourites } from '../hooks/useFavourites'
import { useI18n } from '../context/I18nContext'
import { vendorLogo } from '../utils'

export default function CarPage() {
  const { t } = useI18n()
  const { state } = useLocation()
  const navigate = useNavigate()
  const car = (state as any)?.car as Car | undefined
  const fav = useFavourites()

  if (!car) {
    return (
      <div>
        <h1>Car details</h1>
        <p>Open details from the list so data is passed via state.</p>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    )
  }

  const Row = ({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={icon} alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
      <div>
        <strong>{label}:</strong> {value}
      </div>
    </div>
  )

  return (
    <div>
      <button className="btn btn-outline" onClick={() => navigate(-1)}>
        <img
          src="/assets/icons/angle-left.svg"
          alt=""
          style={{ width: 16, height: 16, verticalAlign: '-2px' }}
        />{' '}
        {t.back}
      </button>
      <div className="card" style={{ marginTop: 16 }}>
        <img
          src={car.pictureURL}
          alt={car.name}
          style={{ width: 240, height: 140, objectFit: 'cover', borderRadius: 8 }}
        />
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={vendorLogo(car.vendor)}
              alt={car.vendor}
              title={car.vendor}
              style={{ height: 24 }}
            />
            {car.name}{' '}
            <button
              className={fav.isFav(car.id) ? 'fav-btn active' : 'fav-btn'}
              onClick={() => fav.toggle(car.id)}
              aria-label={`toggle favourite for ${car.name}`}
            >
              {fav.isFav(car.id) ? '♥' : '♡'}
            </button>
          </h2>
          <div className="details" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
            <Row icon="/assets/icons/door.svg" label={t.doors} value={car.doors || '—'} />
            <Row icon="/assets/icons/bag.svg" label={t.bags} value={car.baggageQuantity || '—'} />
            <Row
              icon="/assets/icons/snowflake.svg"
              label={t.airCon}
              value={String(car.airConditionInd)}
            />
            <Row icon={vendorLogo(car.vendor)} label={t.vendor} value={car.vendor} />
            <Row
              icon="/assets/icons/transmission.svg"
              label={t.transmission}
              value={car.transmission || '—'}
            />
            <Row icon="/assets/icons/fuel.svg" label={t.fuel} value={car.fuelType || '—'} />
            <Row
              icon="/assets/icons/person.svg"
              label={t.passengers}
              value={car.passengerQuantity || '—'}
            />
          </div>
        </div>
        <div className="price">
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {car.currency} {car.price.toFixed(2)}
          </div>
          <button className="btn btn-primary">{t.book}</button>
        </div>
      </div>
    </div>
  )
}
