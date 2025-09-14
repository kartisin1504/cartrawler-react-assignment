import React from 'react'
import { vendorLogo } from '../../utils'

export function CarTitle({ vendor, name }: { vendor: string; name: string }) {
  return (
    <div className="card-title">
      <img className="vendor-logo" src={vendorLogo(vendor)} alt={vendor} title={vendor} />
      <small className="vendor-name">{name}</small>
    </div>
  )
}
