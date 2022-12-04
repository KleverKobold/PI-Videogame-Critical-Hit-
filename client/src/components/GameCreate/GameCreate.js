import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postGame, getGenres, getPlatforms} from "../../actions/index";
import "./gameCreate.css"




function validate(input){
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    

    if(!input.name.trim()){
        errors.name ="A name for the game is required"
    } else if(!regexName.test(input.name.trim())){
            errors.name = "This input only accepts letters and spaces"
    }

    if(!input.rating || input.rating > 5 || input.rating < 1){
        errors.rating = "Please, a Rating of 1-5 is required"
    }

    if(!input.description.trim()){
        errors.description = "Please, write a small comment about the game, its required"
    }

    if(!input.releaseDate.trim()){
        errors.releaseDate = "Dont forget of adding the date, we recommend this format = DD/MM/YYYY"
    }

    if(input.platforms.length === 0){
        errors.platforms = "Dont forget of select on which platforms this game can be played"
    }

    if(input.genres.length === 0){
        errors.genres = "Please, we encourage you to select one or a few genres"
    }

  return errors
}



export function GameCreate (){
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state)=> state.genres);
    const games = useSelector((state) => state.games);
    const platforms = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({})
    
    
    
 

    const [input, setInput] = useState({
        name: "",
        description : "",
        releaseDate : "",
        rating: "",
        image: "",
        genres: [],
        platforms: []
    })

    



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })  
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
       
        
    }


     

    function handleSelectGenre(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
    function handleSelectPlatform(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    }
    
    function handleSubmitNewGame(e){
        
        e.preventDefault()
        dispatch(postGame(input))
        if(input.name && input.description && input.releaseDate && input.rating && input.genres && input.platforms){
        alert("Game Added!")
        setInput({
            name: "",
        description : "",
        releaseDate : "",
        rating: "",
        image: "",
        genres: [],
        platforms: []
        })
        history.push("/home")
    }
        else{
            alert("Some inputs were incomplete, try again!")
            history.push("/game")
        }
        
    }

    function handleDeleteGenre(element){
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !==element)
        })
    }

    function handleDeletePlatform(el){
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !==el)
        })
    }
    
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, []);
    

    return(
        <div className="formCreate">
            <Link to={"/home"}><button className="btnGoBack">Go Back</button></Link>
            <h1 className="titleCreate">Upload your Favorite Game!</h1>
            <form onSubmit={ (e) => handleSubmitNewGame(e)}>
                <div className="inputCreate">
                    <label>Name:</label>
                    <input type={"text"} value={input.name} name="name" onChange={e => handleChange(e)} />
                    {errors.name && (
                                     <p className="error">{errors.name}</p>
                    )}
                </div>
                <div className="inputCreate">
                    <label>Description:</label>
                    <input type={"text"} value={input.description} name="description" onChange={e => handleChange(e)}/>
                    {errors.description && (
                                     <p className="error">{errors.description}</p>
                    )}
                </div>
                <div className="inputCreate">
                    <label>Release Date:</label>
                    <input type={"text"} value={input.releaseDate} name="releaseDate" onChange={e => handleChange(e)}/>
                    {errors.releaseDate && (
                                     <p className="error">{errors.releaseDate}</p>
                    )}
                </div >
                <div className="inputCreate">
                    <label>Rating:</label>
                    <input type={"number"} value={input.rating} name="rating" onChange={e => handleChange(e)}/>
                    {errors.rating && (
                                     <p className="error">{errors.rating}</p>
                    )}
                </div>
                <div className="inputCreate">
                    <label>Image:</label>
                    <input type={"text"} value={input.image} name="image" onChange={e => handleChange(e)}/>
                </div>

                <select onChange={e=> handleSelectGenre(e)} className="selectCreate">
                      <option selected="true" disabled="disabled">Genres</option>
                    {genres.map((genre) =>(
                        
                        <option value={genre.name}>{genre.name}</option>
                    ))}
                </select>
                {input.genres.map(element =>
                <div className="divGenre">
                 <p className="genreCreate" onClick={()=> handleDeleteGenre(element)}>{element}</p>
                   
                    </div> 
                )}
                <div>{errors.genres && (
                                    <p className="error">{errors.genres}</p>
                    )}</div>

                <select onChange={e=> handleSelectPlatform(e)} className="selectCreate">
                    <option selected="true" disabled="disabled">Platforms</option>
                    
                    {platforms.map((platform) =>( 
                        
                         <option value={platform}>{platform}</option>
                        
                    ))}
                    
                </select>
                {input.platforms.map(el =>
                <div className="divPlatf">
                 <p className="platfCreate" onClick={()=> handleDeletePlatform(el)}>{el}</p>
                   
                    </div> 
                )}
                <div>{errors.platforms && (
                                    <p className="error">{errors.platforms}</p>
                    )}</div>

                

                <button type="submit" className="submitCreate" >Add New Game</button>
            </form>
            
        </div>
    )
}