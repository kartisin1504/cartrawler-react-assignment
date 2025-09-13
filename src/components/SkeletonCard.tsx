import React from 'react'
export default function SkeletonCard() {
  return (
    <article className="card skeleton" aria-label="loading card">
      <div className="sk-img" />
      <div className="sk-lines">
        <div className="sk-line" />
        <div className="sk-line short" />
        <div className="sk-line" />
      </div>
      <div className="sk-price" />
    </article>
  )
}
