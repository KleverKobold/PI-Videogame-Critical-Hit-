import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGameByName } from "../../actions";
import "./searchBar.css"


export default function SearchBar(){
    const dispatch = useDispatch();
    const [gameName, setGameName] = useState("")

   function handleInputChange(e){
        e.preventDefault()
        setGameName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchGameByName(gameName));
        setGameName('');
        
        
        
    }

    return(
        <div className="divOnSearch">
            <input
            className="inputOnSearch"
             type = "text"
             placeholder="Search Game..."
             onChange={(e)=> handleInputChange(e)}
             value={gameName}
             />
             <button type="submit" onClick={(e) => handleSubmit(e)} className="btnOnSearch" >Search</button>
             

        </div>
    )
}