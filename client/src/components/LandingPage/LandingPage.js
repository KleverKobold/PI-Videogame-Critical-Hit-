import React from "react"
import {Link} from "react-router-dom"
import  "./landingPage.css"


export default function LandingPage (){
 return(
    <div className="landingDiv">
        <div>
        <h1 className="question" >Which story you want to play today?</h1>
        </div>

        <div>
        <Link to ="/home">
            <button className="btnLanding">Let's find it out!</button>
        </Link>
        </div>
    </div>
 )
}