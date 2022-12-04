import axios from "axios";


export const GET_DETAILS = "GET_DETAILS"
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME"
export const GET_GENRES = "GET_GENRES"
export const GET_PLATFORMS= "GET_PLATFORMS"
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const FILTER_BY_CREATION= "FILTER_BY_CREATION"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const POST_GAME = "POST_GAME"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const DELETE_GAME = "DELETE_GAME"



 export function getPlatforms(){
    return async function(dispatch){
        let games= await axios.get("http://localhost:3001/videogames")
         let allGames =  games.data.map(game=> game)
         let gamesApi =  allGames.filter(game => !game.createdInDb )
         let apiPlatforms = gamesApi.map(game => game.platforms)
         let repeatedPlatforms =  apiPlatforms.flat()
         const uniquePlatforms = [...new Set(repeatedPlatforms)];
         console.log ("UNIQUE PLATFORM IN ACTIONS ===", uniquePlatforms)
         return dispatch({
             type: GET_PLATFORMS,
             payload: uniquePlatforms
         })
     }
 } 








export function getVideogames(){
     return  function(dispatch){
    axios.get("http://localhost:3001/videogames").then((data)=> {
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: data
        })
        
    });
        
     }
}

export function getGenres(){
    return async function(dispatch){
      try{ let genres = await axios.get("http://localhost:3001/genres");
       
       
       return dispatch({
           type: GET_GENRES,
           payload: genres.data
       })
    }catch (error){
        return alert (`error ${error.message}`)
} 

}
}


export function getDetail(id){
    return async function(dispatch){
        try {
            var game = await axios.get(`http://localhost:3001/videogames/${id}`)
            console.log("GAME.DATA ===", game.data)
            return dispatch ({
                type: GET_DETAILS,
                payload: game.data
            })
        } catch (error) {
            console.log ("ERROR EN GET DETAIL EN ACTIONS", error)
            
        }
    }
}



export function filterGamesByGenre(payload){
    return{
        type : FILTER_BY_GENRE,
        payload
    }
}


export function filterGamesByCreation (payload){
    return {
        type: FILTER_BY_CREATION,
        payload
    }
}


export const postGame = (payload) => async ()=> {
    try{
        const gamePost = await axios.post(`http://localhost:3001/videogames`, payload);
        console.log("ESTE ES EL PAYLOAD EN POSTGAME/ACTION ==", payload )
        return gamePost
    }
    catch (error){
        console.log("Error en el post de las actions ==", error)
    }
}


export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating (payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function searchGameByName(name){
    return async function (dispatch){
        try {
            
            var searchedGame = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type : GET_GAME_BY_NAME,
                payload: searchedGame.data
            })

        } catch (error) {
            return alert("The game was not found")
            
            
        }
    }

}