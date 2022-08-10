import React from 'react'

const Card = ({name,image,weight,temperaments}) => {
  return (
    <div>
        <h3>{name}</h3>
        <img src={image} alt={name}/>
        <span>{weight} Kg</span>
        <span>{temperaments}</span>
    </div>
  )
}

export default Card