const { Router } = require("express");
const router = Router();
const { getAllGenres, createGenre } = require("../controllers/genres");

router.get("/", async (req, res) => {
  try {
    let allGenres = await getAllGenres();
    console.log("All Genres==", allGenres);

    res.status(200).send(allGenres);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  console.log("Genero en la ruta ==", name);
  try {
    const newGenre = await createGenre(name);
    res.status(200).send(`El genero ${newGenre}  se creo`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
