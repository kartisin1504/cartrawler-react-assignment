import React from 'react'
import type { Legend } from '../types'

interface LegendProps {
  legend: Legend
  pickupLabel: string
  returnLabel: string
  format: (iso: string) => string
}

export default function LegendBar({ legend, pickupLabel, returnLabel, format }: LegendProps) {
  return (
    <div className="legend">
      <div>
        <strong>{pickupLabel}</strong> {format(legend.pickUp)}
        {legend.pickUpLocation && ` • ${legend.pickUpLocation}`}
      </div>
      <div>
        <strong>{returnLabel}</strong> {format(legend.return)}
        {legend.returnLocation && ` • ${legend.returnLocation}`}
      </div>
    </div>
  )
}
