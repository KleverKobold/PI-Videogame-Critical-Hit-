const { Router } = require('express');
const express = require("express")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame = require("./Videogames.js"); 
const genre = require("./Genres.js");


const router = Router();
//router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.use("/videogames", videogame);
router.use("/genres", genre)


module.exports = router;
