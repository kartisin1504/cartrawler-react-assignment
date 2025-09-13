import React from 'react'
import type { Car } from '../../types'
import { CarMedia } from './CarMedia'
import { CarTitle } from './CarTitle'
import { CarChips } from './CarChips'
import { CarPriceActions } from './CarPriceActions'

interface Props {
  car: Car
  labels: { passengers: string; bags: string; doors: string; transmission: string; airCon: string; view: string }
  isFav: (id: string) => boolean
  toggleFav: (id: string) => void
}

export default function CarCard({ car, labels, isFav, toggleFav }: Props) {
  return (
    <article className="card cabforce-card">
      <CarMedia pictureURL={car.pictureURL} name={car.name} />
      <div className="card-body">
        <CarTitle vendor={car.vendor} name={car.name} />
        <CarChips
          labels={labels}
          passengers={car.passengerQuantity}
          bags={car.baggageQuantity}
          doors={car.doors}
          transmission={car.transmission}
          airCon={String(car.airConditionInd)}
        />
      </div>
      <CarPriceActions car={car} isFav={isFav} toggleFav={toggleFav} viewLabel={labels.view} />
    </article>
  )
}
