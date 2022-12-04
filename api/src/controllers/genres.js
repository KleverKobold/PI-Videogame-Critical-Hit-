const axios = require("axios")
require('dotenv').config();
const {APIKEY} = process.env
const {Videogame, Genre} = require("../db")

const getAllGenres = async () =>{
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
    //console.log("apiUrl=", apiUrl.data.results)
    const apiGenres= await apiUrl.data.results.map(g => g.id)
    console.log("apiGenres", apiGenres)
    


        apiGenres.map(genre => {
            Genre.findOrCreate({
                where: {name : genre}
            })
        });
    const allGenres = await Genre.findAll();
    
    //res.send(allGenres)
    return allGenres
}


const createGenre = async (name)=>{
    try{
        const newGenre = await Genre.create({
    
            name:name
        })
        return newGenre
    }
    catch(error){
        return res.status(400).send(error.message) 
    }
}


module.exports= {getAllGenres, createGenre}