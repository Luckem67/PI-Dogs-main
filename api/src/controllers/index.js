const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    //.data xq me va a traer la info en .data
    return {
      id: e.id,
      name: e.name,
      height: e.height.metric.concat(" cm"),
      weight: e.weight.metric.concat(" kgs"),
      life_span: e.life_span,
      image: e.image.url,
      temperament: e.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament, //para que cdo cree una raza nueva me traiga los temperamentos
      attributes: ["name"], // del temperamento el name del temperamento creado en models, el id me lo trae igual
      through: {
        //sobre la tabla atributos, esa configuracion va siempre
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  //aca abjo llamo a las funciones y las ejecuto, sino, no hacen nada
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal; //me devuelve un arreglo
};

const getAllTemperaments = async (req, res) => {
  const temperamentsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
  );
  const temperaments = temperamentsApi.data.map((el) => el.temperament);

  //uno cadenas y separo por comas
  let dataTemperament = temperaments.join().split(",");
  //elimino espacios en blanco a c/lado
  dataTemperament = dataTemperament.map((el) => el.trim());

  //agrego los tempaeramentos a la base de datos
  dataTemperament.forEach((el) => {
    if (el !== "") {
      Temperament.findOrCreate({
        where: { name: el },
      });
    }
  });

  const allTemperaments = await Temperament.findAll();
  res.status(200).json(allTemperaments);
};

module.exports = {
  getAllDogs,
  getApiInfo,
  getDbInfo,
  getAllTemperaments,
};
