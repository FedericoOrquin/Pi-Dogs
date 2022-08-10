const { Router } = require('express');
const {Dog,Temperaments} =require('../db.js') 
const {dataApi,dataDB,getAll,} = require('../controllers/index');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
/* [ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal*/

//si te pasan por query un perro se fija si exite y lo trae, sino, trae todos los perros

router.get('/dogs',async(req,res)=>{
    const dogName=req.query.name;
    const allDogs= await getAll();
    if(dogName){
        const thisDog=await allDogs.filter((dog)=> dog.name.toLowerCase().includes(dogName.toLowerCase()))
        thisDog ? 
        res.status(200).send(thisDog):
        res.status(404).send('el perro no existe');
    }else{
        res.status(200).send(allDogs);
    }

})


router.get('/dogs/:id', async(req,res)=>{
    const dogID=req.params.id;
    const allDogs=await getAll();
    if(dogID){
        const thisDog=await allDogs.find((dog)=> dog.id == dogID);
        thisDog ? 
        res.status(200).send(thisDog):
        res.status(404).send('el id no existe');
    }
})

router.get('/temperaments', async (req,res)=>{
    const infoApi =await dataApi();
    const temperaments=infoApi.map((dog)=> dog.temperaments).join().split(',');
    const temperamentsForDB=temperaments.map((e)=> e.trim())
    
    temperamentsForDB.forEach(e => {
        if(e!== ""){
            Temperaments.findOrCreate({ //si no esta en la tabla crea la nueva entrada
                where:{name:e} 
            })
        }
    });

    const allTemperaments=await Temperaments.findAll()
    res.status(200).send(allTemperaments);
})

router.post('/dogs', async(req,res)=>{
    const { name,
            height,
            weight, 
            life_span, 
            image, 
            temperaments, 
            DB_created 
    } =req.body;

    const newDog=await Dog.create({
        name,
        height,
        weight, 
        life_span, 
        image, 
        DB_created 
    })

    const temperamentsAux=await Temperaments.findAll({
        where:{name:temperaments}
    })
    newDog.addTemperaments(temperamentsAux);
    res.send('Perro creado con exito');

})



/*
[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado*/


/*
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
[ ] POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos
[ ] GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
