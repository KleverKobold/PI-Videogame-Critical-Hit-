const {Router, response} = require("express")
const { getAllGames, createGame, getGameId} = require("../controllers/videogames")
const {Videogame} = require("../db")


const router = Router();



//ARMAR UN ARRAY PARA ACOMODAR LOS JUEGUITOS??
//--------> Controllers



//--------->Rutas

router.get("/", async (req, res) =>{
        try {
            const name = req.query.name
            let allVideogames = await getAllGames();
            
            
                 if(name){
                     let videogameByName = await allVideogames.filter(game => game.name.trim().toLowerCase().includes(name.trim().toLowerCase()));
                     videogameByName.length?
                     res.status(200).send(videogameByName):
                     res.status(404).send("The game youre searching for, does not exist")
                } else{
                 res.status(200).send(allVideogames)
               }
        } catch (error) {
            res.status(400).send(error.message)
        }
});





router.get("/:id", async (req, res) => {
const {id} = req.params


    try {
        if(id){
            const gameId= await getGameId(id)
           
            res.status(200).json(gameId)
            
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})


router.post("/", async (req, res) => {
 const {name, description, releaseDate, rating, image, genres, platforms, createdInDb} = req.body
 
    try {
        const exist = await Videogame.findOne({
            where: {name: name.trim().toLowerCase()}
        })
        if(exist) return res.status(400).send("The game already exists");
        

        const newGame = await createGame(name, description, releaseDate, rating, image, createdInDb, platforms, genres);
       
         if(newGame.name && newGame.description && newGame.releaseDate && newGame.rating && newGame.platforms.length === 0 ){

                    res.status(201).send(`¡Mission Passed! The game ${newGame.name} was created successsfully`);

             }else{
                res.send("Some inputs are incomplete")
             }
    } catch (error) {
        res.send(`Something went wrong : ${error.message}`)
    }

})







module.exports = router;