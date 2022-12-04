import React from "react";
import "./paginate.css"

export default function Paginate ({gamesPerPage, allVideogames, paginate}){
    const pageNumbers = []


    
    for (let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return(
        <nav>
            <ul className="paginate">
                {pageNumbers && pageNumbers.map((number)=> (
                    <li className="number" key={number}>
                    <a onClick={()=> paginate(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}