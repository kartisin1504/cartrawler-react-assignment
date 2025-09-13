import React from 'react'

export function CarMedia({ pictureURL, name }: { pictureURL: string; name: string }) {
  return (
    <div className="card-media">
      <img src={pictureURL} alt={name} />
    </div>
  )
}
