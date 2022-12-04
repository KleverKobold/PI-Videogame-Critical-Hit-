import React from "react";
import {Link, useParams, useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteGame } from "../../actions";
import { useEffect, useState } from "react";
import "./videoGameDetail.css"


export default function VideoGameDetail (){
const dispatch = useDispatch();
const {id} = useParams();
const history= useHistory();
const [loading, setLoading] = useState(true)

useEffect(()=> {
    dispatch(getDetail(id)).then(()=> setLoading(false)).catch(()=> {
        alert("Game not Found")
        window.location.replace("http://localhost:3000/home")
    })
}, [dispatch])

var regex = /(<([^#$>]+)>)/gi;

function handleGoBack (e){
    
}

const myGame = useSelector((state)=> state.gameDetail)
console.log ("THIS IS THE GAME IN THE STATE.GAMEDETAIL===", myGame)

if(loading){
    return(
        <div className="loading">
        <img src="https://i.imgur.com/HDutjcT.gif"  className="loadingImg" />
        <p className="loadingTxt">We are looking for your game in our Dungeon...</p>
        </div> 
    )
}
return(
    <div>
        
        
        <div className="gameLetters">
            <h1 className="gameTitle">{myGame.name}</h1>
            <img src={myGame.image} alt="No Image Available" width={"700px"} height={"500px"} className="gameImg" />
            <div className="gameDesc">
             <div>   
                <h2 > Description:</h2>  <p>{myGame.description.replace(regex, " ").replace(" ", " ")}</p>
             </div>
            <h3>Release Date:  {myGame.releaseDate}</h3>
            <h4>Rating:  {myGame.rating}</h4>
            <h4>Platforms:  {myGame.platforms }</h4>
            <h4>Genres:  {myGame.genres.map(genre => genre.name? genre.name + " ": genre + " " )}</h4>
            </div>
        </div>

        {/* {
            myGame[0].createdInDb && <div>
                                        <button onClick={(e) => handleDelete(e)}>Delete Game</button>
                                     </div>
        } */}

        <Link to={"/home"}>
            <button className="btnGoHome">Let's go back</button>
        </Link>
    </div>
)

}