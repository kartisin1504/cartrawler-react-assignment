import React from 'react'
import type { FareRules } from '../types'

export default function FareRulesModal({
  open,
  onClose,
  loading,
  error,
  rules
}: {
  open: boolean
  onClose: () => void
  loading?: boolean
  error?: string | null
  rules: FareRules | null
}) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="modal">
      <div className="modal-card">
        <header>
          <strong>Fare rules</strong>
          <button onClick={onClose} aria-label="Close">✕</button>
        </header>

        {loading && <p>Loading…</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && !rules && <p>No specific fare rules available for this rate.</p>}

        {!loading && !error && rules && (
          <div className="rules">
            {rules.cancellation && (
              <p><strong>Cancellation:</strong> {rules.cancellation.freeUntilHours != null
                ? `Free until ${rules.cancellation.freeUntilHours}h before pickup; ` : ''}{rules.cancellation.feeAfter || ''}</p>
            )}
            {rules.changes && <p><strong>Changes:</strong> {rules.changes}</p>}
            {rules.fuelPolicy && <p><strong>Fuel:</strong> {rules.fuelPolicy}</p>}
            {rules.mileage && (
              <p><strong>Mileage:</strong> {(rules.mileage.limitPerDay ?? 'Unlimited')} /day{rules.mileage.excessPerMile ? ` • Excess ${rules.mileage.excessPerMile}` : ''}</p>
            )}
            {rules.deposit && <p><strong>Deposit:</strong> {rules.deposit}</p>}
            {rules.age && <p><strong>Driver age:</strong> {rules.age}</p>}
            {rules.insurance?.length ? <p><strong>Insurance:</strong> {rules.insurance.join(', ')}</p> : null}
            {rules.extras?.length ? (
              <div>
                <strong>Extras:</strong>
                <ul>{rules.extras.map((e, i) => <li key={i}>{e.name}{e.price ? ` – ${e.price}` : ''}</li>)}</ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
