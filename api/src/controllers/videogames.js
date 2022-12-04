const axios = require("axios")
const fetch = require("cross-fetch")
require('dotenv').config();
const {APIKEY} = process.env
const {Videogame, Genre} = require("../db")




//GetAllVideogames = 
//Controladores
const getApiGames = async () => {
   // const apiUrl =  axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`)
   const url = `https://api.rawg.io/api/games?key=${APIKEY}`
   let apiGamesInfo = []
//    let allApiUrls= [];


//    for(let i =1; 1<=5; i++){
//     let apiUrl= await axios.get(`${url}&page=${i}`);
//     console.log("ApiURL ===", apiUrl.data)
//     allApiUrls.push(apiUrl.data.results)
//     const apiGamesData= await axios.all(allApiUrls);
//     console.log("En Teoria Los juegos==", apiGamesData.results)
//     const apiGames = apiGamesData.data.results.map((game)=> {
//         return{
//                     id: game.id,
//                     name: game.name,
//                     description: game.ratings.map(description => description.title),
//                     releaseDate: game.released,
//                     rating: game.rating,
//                     platforms: game.platforms?.map((p) => p.platform.name),
//                     genres: game.genres?.map((g) => g.name),
//                     image: game["background_image"]
//         }
//     }) 
    
//     return apiGames

//    }
     
    
    const promise1 = fetch(url).then((response) => response.json());
    const promise2 = fetch(url + "&page=2").then((response) => response.json());
    const promise3 = fetch(url + "&page=3").then((response) => response.json());
    const promise4 = fetch(url + "&page=4").then((response) => response.json());
    const promise5 = fetch(url + "&page=5").then((response) => response.json());
    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
      (data) => {
        apiGamesInfo = data[0].results
          .concat(data[1].results)
          .concat(data[2].results)
          .concat(data[3].results)
          .concat(data[4].results);
      }
    );

    const apiGames = await apiGamesInfo.map((game) => {
        return {
                     id: game.id,
                     name: game.name,
                     
                     releaseDate: game.released,
                     rating: game.rating,
                     platforms: game.platforms?.map((p) => p.platform.name),
                     genres: game.genres?.map((g) => g.name),
                     image: game["background_image"]
        }
    })


    //         console.log("En teoria estos son los Games==", apiGamesData)
    // const apiGames = await apiUrl.data.results?.map(game => {
    //     return {
    //         id: game.id,
    //         name: game.name,
    //         description: game.ratings.map(description => description.title),
    //         releaseDate: game.released,
    //         rating: game.rating,
    //         platforms: game.platforms?.map((p) => p.platform.name),
    //         genres: game.genres?.map((g) => g.name),
    //         image: game["background_image"]
    //     }
        
    // });
    
    return apiGames
    
}

const getDbGames = async () =>{
    const dbGames = await Videogame.findAll({
        include : {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
                },
            }
    });
    return dbGames
}

const getAllGames = async () =>{
    const apiGames = await getApiGames();
    const dbGames = await getDbGames();
    const allGames = apiGames.concat(dbGames);

    return allGames
}



const getGameId = async (id) => {
    if(id){
        if(!Number(id)){
            const gameDb= await Videogame.findOne({
                include:{
                    model:Genre,
                    attributes:["name"]
                },
                where:{
                    id:id,
                }
            });
            return gameDb
        }
        else{

            const gameFound = await axios(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
            
            const gameApi={
                name: gameFound.data.name,
                description: gameFound.data.description,
                image: gameFound.data.background_image,
                releaseDate: gameFound.data.released,
                rating: gameFound.data.rating ,
                platforms: gameFound.data.platforms?.map((p) => p.platform.name),
                genres: gameFound.data.genres.map(genre => genre.name)
            }
            console.log("JUEGO EN EL CONTROLLER==", gameApi)
            return gameApi
        }
    } else{
        let error = new Error ("The game couldn't been found")
        throw error;
    }



    
}



const createGame = async (name, description, releaseDate, rating, image, createdInDb, platforms, genres) =>{
    
    try {
       
            const newGame = await Videogame.create({
                name : name, 
                description: description, 
                releaseDate: releaseDate, 
                rating: rating, 
                image: image,
                createdInDb: createdInDb, 
                genres: genres, 
                platforms: platforms
            });
            console.log("Platfomrs como propiedad en la func CREATEGAME ==", newGame )
            const genreInDb = await Genre.findAll({
                where: {name : genres}
            })
            
            newGame.addGenre(genreInDb)
            return newGame
        
    } catch (error) {
        return error.message
    }
}


module.exports = {getApiGames, getDbGames, getAllGames, createGame, getGameId}
