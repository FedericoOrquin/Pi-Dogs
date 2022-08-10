import React, { useState } from 'react'
import { getByName } from '../../Actions/Actions'
import {useDispatch} from 'react-redux'

const SearchBar = ({setActualPage}) => {

  const dispatch = useDispatch();
  const[nameOfInput,setNameOfInput]=useState("");

  const handleChange = (e) =>{
    e.preventDefault();
    setNameOfInput(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(getByName(nameOfInput));
    setActualPage(1);
  }

  return (
    <div className='searchBar'>
      <input placeholder='Search your dog' type="text" onChange={(e)=>handleChange(e)}></input>
      <button onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
  )
}

export default SearchBar