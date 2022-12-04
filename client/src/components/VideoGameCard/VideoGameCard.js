import React from "react";
import "./videoGameCard.css"

export default function VideoGameCard ({name, genres, image, rating}){
    return(
    <div className="videogameCard">
        <img src={image} alt="not found" width="300px" height="250px" className="imgGameCard"/>
        <div className="descGameCard">
        <h3>{name}</h3>
        <h5>{genres}</h5>
        <h5>{rating}</h5>
        </div>
       
        

    </div>
    )
}