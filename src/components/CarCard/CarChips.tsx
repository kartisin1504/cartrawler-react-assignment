import React from 'react'

interface Props {
  labels: { passengers: string; bags: string; doors: string; transmission: string; airCon: string }
  passengers: React.ReactNode
  bags: React.ReactNode
  doors: React.ReactNode
  transmission: React.ReactNode
  airCon: React.ReactNode
}

export function CarChips({ labels, passengers, bags, doors, transmission, airCon }: Props) {
  return (
    <div className="chip-row">
      <span className="chip">
        <img src="/assets/icons/person.svg" alt="" aria-hidden="true" />
        {labels.passengers}: <strong>{passengers}</strong>
      </span>
      <span className="chip">
        <img src="/assets/icons/bag.svg" alt="" aria-hidden="true" />
        {labels.bags}: <strong>{bags}</strong>
      </span>
      <span className="chip">
        <img src="/assets/icons/door.svg" alt="" aria-hidden="true" />
        {labels.doors}: <strong>{doors}</strong>
      </span>
      <span className="chip">
        <img src="/assets/icons/transmission.svg" alt="" aria-hidden="true" />
        {labels.transmission}: <strong>{transmission}</strong>
      </span>
      <span className="chip">
        <img src="/assets/icons/snowflake.svg" alt="" aria-hidden="true" />
        {labels.airCon}: <strong>{airCon}</strong>
      </span>
    </div>
  )
}
