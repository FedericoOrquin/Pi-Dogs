import axios from 'axios';

export function getDogs(){
    
    return function(dispatch){
        return axios.get('http://localhost:3001/dogs')
        .then((response)=>{
            dispatch({
                type:'GET_DOGS', 
                payload:response.data
            })
        })
    }
}

export function getTemperaments(){
    
    return function(dispatch){
        return axios.get('http://localhost:3001/temperaments')
        .then((response)=>{
            dispatch({
                type:'GET_TEMPERAMENTS', 
                payload:response.data
            })
        })
    }
}
export function getByName(name){
    
    return async function(dispatch){
        var response= await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return(
            dispatch({
                type:'GET_BYNAME', 
                payload:response.data
            })
        )    
    }
}
export function getById(id){
    
    return async function(dispatch){
        var response= await axios.get(`http://localhost:3001/dogs/${id}`)
        return(
            dispatch({
                type:'GET_BYID', 
                payload:response.data
            })
        )
    }
}

export function sortByname(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function sortByweight(payload){
    return{
        type:'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterByTemperaments(payload){
    return{
        type:'FILTER_BY_TEMPERAMENTS',
        payload
    }
}

export function filterIfDBCreated(payload){
    return{
        type:'FILTER_IF_DB_CREATED',
        payload
    }
}
