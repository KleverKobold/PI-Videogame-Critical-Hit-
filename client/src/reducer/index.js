import { ORDER_BY_RATING, GET_DETAILS, GET_VIDEOGAMES, GET_PLATFORMS, FILTER_BY_GENRE, FILTER_BY_CREATION, ORDER_BY_NAME, GET_GAME_BY_NAME, POST_GAME, GET_GENRES } from "../actions"


const initialState = {
    games : [],
    listOfGames : [],
    genres : [],
    platforms: [],
    gameDetail: []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        
        case FILTER_BY_GENRE:
            const allVideogames = state.listOfGames
            
            const gamesFiltered = action.payload === "allGenres"? allVideogames : allVideogames.filter((games)=>{ 
                if(games.genres.some(genre => genre === action.payload)){
                    return games.genres.map(genre => genre===action.payload)
                } else{
                    return games.genres.includes(action.payload)
                }
            })
            
            return {
                ...state,
                games : gamesFiltered
            }
            
                

                case GET_DETAILS:
                    return{
                        ...state,
                        gameDetail: action.payload
                    }
                
                case GET_VIDEOGAMES:
                    return{
                        ...state,
                        games: action.payload,
                        listOfGames: action.payload
                    }

                case GET_PLATFORMS:
                    return{
                        ...state,
                        platforms: action.payload
                    }

                case GET_GAME_BY_NAME :
                    return{
                            ...state,
                            games : action.payload
                        }

                case GET_GENRES:
                    return{
                        ...state,
                        genres: action.payload
                    }


                 case FILTER_BY_CREATION:
                        const videogamesByCreation = state.listOfGames
                        const createdGames = action.payload === "created"? videogamesByCreation.filter(game => game.createdInDb): 
                        videogamesByCreation.filter(game => !game.createdInDb);
                        return{
                            ...state,
                            games: action.payload=== "all"? state.listOfGames : createdGames
                        }
                    
                case ORDER_BY_NAME :
                        
                        const newOrder = action.payload === "upward"?
                        state.games.sort(function(a, b){
                            if(a.name.toLowerCase() > b.name.toLowerCase()){
                                        return 1;
                                    }
                                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                                        return -1
                                    }
                                    return 0;
                                }):
                                state.games.sort(function(a, b){
                                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                                        return -1;
                                    }
                                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                                        return 1
                                    }
                                    return 0;
                                })
                            return{
                                ...state,
                                games: newOrder
                            }
            
            case ORDER_BY_RATING:
                const orderByRating = action.payload === "ratingDesc"?
                state.games.sort(function (a, b){
                    if(a.rating > b.rating){
                        return -1
                    }
                    if(a.rating < b.rating){
                        return 1
                    }
                    return 0
                }):
                state.games.sort(function (a, b){
                    if(a.rating > b.rating){
                        return 1
                    }
                    if(a.rating < b.rating){
                        return -1
                    }
                    return 0
                })
                return{
                    ...state,
                    games: orderByRating
                }



            case POST_GAME:
                return{
                    ...state
                }
    
        default:
            return state
    }
}


export default rootReducer