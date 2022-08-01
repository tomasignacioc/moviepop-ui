import "./Loading.css"
import React from 'react'

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='loader'></div>
      <h1 className='loading-text'>Loading...</h1>
    </div>
  )
}