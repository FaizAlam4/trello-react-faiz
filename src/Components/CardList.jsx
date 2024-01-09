/* eslint-disable react/prop-types */
// import React from 'react'
import './CardList.css'

function CardList({data}) {
  return (
    <div className='card-list'>{data.name}</div>
  )
}

export default CardList