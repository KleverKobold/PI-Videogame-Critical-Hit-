import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getVideogames, filterGamesByGenre, filterGamesByCreation, orderByName, orderByRating } from "../../actions/index";
import {Link} from "react-router-dom"
import VideoGameCard from "../VideoGameCard/VideoGameCard";
import SearchBar from "../SearchBar/SearchBar";
import Paginate from "../Paginate/Paginate";
import "./home.css"

{/*SearchBar (Buscar videojuego por nombre) */}
{/*Listado de Videojuegos mostrando su imagen, nombre y genero */}
{/* Boton para filtrar por genero y por videojuego creado por nosotros */}
{/*Boton para ordenar descendente o ascendentemente, por orden alfabetico o Rating*/}
{/* Paginado, debe mostrar 15 juegos por pagina*/}


export default function Home (){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.games);
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)
    const [loading, setLoading] = useState(true)

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0);
    }

    //Equivale al mapDispatchToProps
    useEffect(()=>{
        dispatch(getVideogames()).then(()=> setLoading(false))
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
        setCurrentPage(1)
    }

    function handleFilterGenre(e){
        dispatch(filterGamesByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByCreation(e){
        dispatch(filterGamesByCreation(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value} Order`)
    }
    function handleOrderByRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value} Order`)
    }

    

    if(loading){
        return(
            <div className="loading">
            <img src="https://i.imgur.com/HDutjcT.gif"  className="loadingImg" />
            <p className="loadingTxt">We are looking for your Games in our Dungeon...</p>
            </div> 
        )
    }




    return (
        <div className="homeScreen">
           <div className="navbar">
            
            <h1 className="titleHome">Critical Hit!</h1>
            <button onClick={e=> {handleClick(e)}} className="btnAllGames">
                See all Videogames
            </button>
            <SearchBar className="searchBarHome" />
            <div>
                <select onChange={e=> handleOrderByName(e)} className="selectByName">
                    <option value= "upward">Upward A-Z</option>
                    <option value = "downward">Downward Z-A</option>
                </select>
                <select onChange={e=> handleOrderByRating(e)} className="selectByRating">
                    <option value="ratingAsc">Upward 1-5</option>
                    <option value="ratingDesc">Upward 5-1</option>
                </select>
                <select onChange={e=> handleFilterByCreation(e)} className="selectByCreation">
                    <option value="all">All Games</option>
                    <option value="created">Created Games</option>
                    <option value="predetermined">Predetermined Games</option>
                </select>
                <select onChange={e => handleFilterGenre(e)} className="selectByGenre">
                    <option value={"allGenres"}>All</option>
                    <option value={"Action"}>Action</option>
                    <option value={"Adventure"}>Adventure</option>
                    <option value={"Arcade"}>Arcade</option>
                    <option value={"Board Games"}>Board Games</option>
                    <option value={"Card"}>Card</option>
                    <option value={"Casual"}>Casual</option>
                    <option value={"Educational"}>Educational</option>
                    <option value={"Family"}>Family</option>
                    <option value={"Fighting"}>Fighting</option>
                    <option value={"Indie"}>Indie</option>
                    <option value={"Massively Multiplayer"}>Massively Multiplayer</option>
                    <option value={"Platformer"}>Platformer</option>
                    <option value={"Puzzle"}>Puzzle</option>
                    <option value={"Racing"}>Racing</option>
                    <option value={"RPG"}>RPG</option>
                    <option value={"Simulation"}>Simulation</option>
                    <option value={"Shooter"}>Shooter</option>
                    <option value={"Sports"}>Sports</option>
                    <option value={"Strategy"}>Strategy</option>
                </select>
            <Link to="/game" className="linkToCreate">Add your favorite Videogame</Link>
                </div>
            </div>

                
            <div className="videoGameRows">
                {currentGames?.map(game =>{
                    return(
                        <>
                        <Link key={game.id} to={`/home/${game.id}`} className="linkToCard">
                            <VideoGameCard 
                                            key={game.id} 
                                            name={game.name} 
                                            image={game.image} 
                                            genres={game.genres.map((genre)=> (typeof genre ==="object"? genre.name : genre)).join(", ")}
                                            rating={game.rating}
                                            />
                        </Link>
                
                        </>
                        )
                    })
                }
                <Paginate gamesPerPage={gamesPerPage} allVideogames={allVideogames.length} paginate={paginate} className="paginateHome"/>
            </div>
        </div>
    )
}