const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getAllDogs } = require("../controllers/index");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name; //un query con la propiedad name que me pasan por url
  let dogsTotal = await getAllDogs();
  if (name) {
    // el.name es el nombre de la raza del perro, o sea del perro
    let dogsName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogsName.length
      ? res.status(200).send(dogsName)
      : res.status(404).send("dog not found");
  } else {
    // si no hay un query mando todos
    res.status(200).send(dogsTotal);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dogsTotal = await getAllDogs();
  if (id) {
    let dogId = await dogsTotal.filter((el) => el.id == id); //con === no funcionaba
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("That id was not found 😕");
  }
});

router.post("/", async (req, res) => {
  let {
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    createdInDb,
    temperament,
  } = req.body;

  let dogCreated = await Dog.create({
    //creo el perro con todo esto)
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    createdInDb,
  });
  //me lo traigo del modelo de temperament
  let temperamentDb = await Temperament.findAll({
    //el temp lo tengo que encontrar en el modelo q
    where: { name: temperament }, // tiene toddos los temperamentos, donde coincida con el temperamento del modelo
  });
  dogCreated.addTemperament(temperamentDb); //Temperament de la tabla de base de datos
  res.send("Dog created 🐶");
});

module.exports = router;
