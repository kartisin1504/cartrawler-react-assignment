import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Car } from '../../types'
import type { FareRules } from '../../types'          // add this type as shown below if you haven't yet
import { getFareRules } from '../../utils'            // add this util (remote→local fallback)
import FareRulesModal from '../FareRulesModal'        // simple modal component (see below)

interface Props {
  car: Car
  isFav: (id: string) => boolean
  toggleFav: (id: string) => void
  viewLabel: string
}

export function CarPriceActions({ car, isFav, toggleFav, viewLabel }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rules, setRules] = useState<FareRules | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Try to derive a vendor+code key. Make sure your Car type includes `code?: string`
  const vendor = (car.vendor || '').toUpperCase()
  const code = (car as any).code || (car as any).Code || ''  // populated in flattenCars

  async function openRules() {
    setOpen(true)
    setLoading(true)
    setError(null)
    try {
      const data = await getFareRules(vendor, code)
      setRules(data)
    } catch (e) {
      setError('No fare rules available for this rate.')
      setRules(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-price">
      <div className="amount">{car.currency} {car.price.toFixed(2)}</div>
      <div className="note">per rental · taxes included</div>

      <div className="cta-row">
        <button
          className={isFav(car.id) ? 'fav-btn active' : 'fav-btn'}
          onClick={() => toggleFav(car.id)}
          aria-label={`toggle favourite for ${car.name}`}
          title={isFav(car.id) ? 'Saved' : 'Save'}
        >
          {isFav(car.id) ? '♥' : '♡'}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={openRules}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Fare rules
        </button>
      </div>

      <div className="cta-row" style={{ marginTop: 8 }}>
        <Link
          to={`/car/${encodeURIComponent(car.id)}`}
          state={{ car }}
          className="btn btn-primary fullwidth"
          aria-label={`${viewLabel} details for ${car.name}`}
        >
          {viewLabel}
        </Link>
      </div>

      {/* Modal */}
      <FareRulesModal
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        error={error}
        rules={rules}
      />
    </div>
  )
}
