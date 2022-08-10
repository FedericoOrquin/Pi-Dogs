import React,{useEffect,} from 'react'
import {Link,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getById } from '../../Actions/Actions'


const Detail = () => {

  const dispatch=useDispatch();
  const {id}=useParams();
  const details = useSelector((state)=>state.details);

  useEffect(()=>{
    dispatch(getById(id));
  },[dispatch,id])


  return (
    <div>
      {
        details.length > 0 ? (
          <div>
            <h1>{details[0].name}</h1>
            <img src={details[0].image} alt="dog" />
            <span>{details[0].weigth}</span>
            <span>{details[0].height}</span>
            <span>{details[0].life_span}</span>
            <span>{!details[0].DB_created? details[0].temperaments : details[0].temperaments.map((e)=>e.name + ', ')}</span>
          </div>
        ) : (
          <h1>Loading</h1>
        )
      }
    </div>
  )
}

export default Detail