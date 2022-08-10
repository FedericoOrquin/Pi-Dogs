const axios = require('axios');
const {Dog,Temperaments} =require('../db.js') 
const {
    API_KEY,API_URL,
  } = process.env;
 
//nos traemos los datos de la api y los trasformamos a el tipo de dato que vamos a usar  
const dataApi = async ()=>{
    const apiDogs= await axios.get(`${API_URL}?api_key=${API_KEY}`)
    const infoDogs=await apiDogs.data.map(dog=>{
        return {
            id:dog.id,
            name:dog.name,
            height:dog.height.metric,
            weight:dog.weight.metric,
            life_span:dog.life_span,
            image:dog.image.url,
            temperaments:dog.temperament,
        }
    })
    return infoDogs;
}

//nos traemos la info de la base de datos propia
const dataDB = async ()=>{
    //trabajamos sobre el model Dog que requerimos
    //estamos haciendo la relacion n <=> m de dogs a temperaments 
    return await Dog.findAll({
        include:{
            model:Temperaments,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }
    })
}

const getAll = async ()=>{
    const infoApi= await dataApi();
    const infoDB= await dataDB();
    const allData=infoApi.concat(infoDB);
    return allData;
}

module.exports={
dataApi,
dataDB,
getAll
}