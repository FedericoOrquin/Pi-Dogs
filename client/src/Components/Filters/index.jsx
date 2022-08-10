import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {filterByTemperaments,filterIfDBCreated,getDogs,getTemperaments} from '../../Actions/Actions.js'

const Filters = () => {
  
  const dispatch = useDispatch();

  const temps=useSelector((state)=>state.temperaments)

  useEffect(()=>{
    dispatch(getDogs());
  },[dispatch])

  useEffect(()=>{
    dispatch(getTemperaments());
  },[dispatch])


  const handleSelectCreated = (e) =>{
    dispatch(filterIfDBCreated(e.target.value))
  }

  const handleSelectTemperament = (e) =>{
    dispatch(filterByTemperaments(e.target.value))
  }


  return (
    <div className='filters'>
        <select onChange={(e)=>handleSelectTemperament(e)}>
          <option key={0} value="temperanment">Temperament</option>
          {
            temps?.map((e)=>{
              return(
                <option key={e.id} value={e.name}>{e.name}</option>
              );
            })
          }
        </select>
        <select onChange={(e)=>handleSelectCreated(e)}>
          <option value="all">All dogs</option>
          <option value="exist">Api dogs</option>
          <option value="created">Created dogs</option>
        </select>
    </div>
  )
}

export default Filters