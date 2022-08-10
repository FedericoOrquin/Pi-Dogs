import React from 'react'
import './styles.css'
import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { getDogs, sortByname, sortByweight } from '../../Actions/Actions.js'
import SearchBar from '../SearchBar'
import Filters from '../Filters/index.jsx'
import Pagess from '../Pages/index.jsx'
import Card from '../Card/index.jsx'


const Home = () => {

    const dispatch=useDispatch();
    const allDogs=useSelector((state)=>state.allDogs);
    const [order,setOrder]=useState("");
    
    //paginado
    const [actualPage,setActualPage]=useState(1);//arrancamos desde la pag 1
    const [dogsPerPage,setDogsPerPage]=useState(8);//cuantos perros van por pag
    const lastDog=actualPage * dogsPerPage;
    const firstDog=lastDog - dogsPerPage;
    const actualDog=allDogs.slice(firstDog,lastDog); //recortamos el array

    const pages=(pageNumber) =>{
        setActualPage(pageNumber);
    }
    //

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handleReset(e){
        e.preventDefault();
        dispatch(getDogs());
    }
    
    function handleSortByName(e){
       e.preventDefault();
       dispatch(sortByname(e.target.value))
       setActualPage(1)
       setOrder(`Sorted ${e.target.value}`) 
    }

    function handleSortByWeight(e){
        e.preventDefault();
       dispatch(sortByweight(e.target.value))
       setActualPage(1)
       setOrder(`Sorted ${e.target.value}`) 
    }

  return (
    <div className='containerHome'>
        <h1>Titulo</h1>
        <Link to='/'>
        <button>Volver</button>
        </Link>
        <div>
            <SearchBar setActualPage={setActualPage} />
        </div>
        <div>
            <Filters/>
            {/*sort by name */}
            <select onChange={handleSortByName} >
                <option value="Ascendente">A-Z</option>
                <option value="Descendente">Z-A</option>
            </select>

            {/*sort by weight */}
            <select onChange={handleSortByWeight} >
                <option value="Mayor">Mas peso</option>
                <option value="Menor">Menos peso</option>
            </select>
        </div>
        <Link to='/dog'>
            <button>Create dog</button>
        </Link>

        <button
        className='refreshButton'
        onClick={(e)=>handleReset(e)}
        >
            Refresh
        </button>

        {/*Paginado */}
        <div className='containerPages'>
        <Pagess dogsPerPage={dogsPerPage} allDogs={allDogs.length} pages={pages} />
        </div>

        {/*dog Section */}
        <div className='mostrarPerros'>
            {
                actualDog ? ( actualDog.map((e)=>{
                    return(
                        
                        <div key={e.id}>
                            <Link to={'/dogs/' + e.id}>  
                                <Card
                                    key={e.id}
                                    name={e.name}
                                    image={e.image}
                                    weight={e.weight}
                                    /* temperament={e.temperaments ? e.temperaments:e.temperaments && e.temperaments.map((i)=>
                                        `${i.name}, `
                                    )} */
                                />  
                            </Link>
                        </div>   
                    )  
                })
                ):(<p>LOADING</p>)
            }
        </div>
    </div>
  )
}

export default Home