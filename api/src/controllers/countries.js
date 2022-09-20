const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getApiInfo = async (req, res) => {
  try {
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    const apiInfo = await apiUrl.data.map((el) => {
      const obj = {
        idL: el.cca3,
        name: el.name.common,
        flag: el.flags[1],
        continents: el.continents[0],
        capital: el.capital ? el.capital[0] : "Capital not found",
        subregion: el.subregion ? el.subregion : "Subregion not found",
        area: el.area,
        population: el.population,
      };
      return obj;
    });
    res.json(apiInfo); //envia al servidor
    await Country.bulkCreate(apiInfo); // envia a la base de datos
  } catch (error) {
    return error;
  }
};

const getById = async (req, res) => {
  try {
    const { idL } = req.params;
    const country = await Country.findByPk(idL, {
      attributes: [
        "idL",
        "name",
        "flag",
        "continents",
        "capital",
        "subregion",
        "area",
        "population",
      ],
      include: Activity,
    });
    country
      ? res.json(country)
      : res.send("The entered country does not exist.");
  } catch (error) {
    res.send(error);
  }
};

/* const getById = async (req, res) => {
  const countryId = req.params.idL.toUpperCase()
  try {
    const countrySearch = await Country.findByPk(countryId, {
      include: Activity
    })
    countrySearch ? res.json(countrySearch) : res.status(404).send(`${countryId} The entered country does not exist.`)
  } catch (error) {
    console.log(error)
  }
} */

/* const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const countryName = await Countries.findOne({
      where: {
        name: name,
      },
      attributes: [
        "idL",
        "name",
        "flag",
        "continents",
        "capital",
        "subregion",
        "area",
        "population",
      ],
      include: Activity,
    });
    if (name) {
      countryName.length > 0
        ? res.send(countryName)
        : res.status(404).send("There is no country with that name");
    }
  } catch (error) {
    res.send(error);
  }
}; */

const getByName = async (req, res) => {
  const { name } = req.query;
  

  if (name) {
    const getCountries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
    res.json(getCountries);
  } else {
    res.status(404).send('The entered country does not exist.');
  }
};

/* const getByName = async (req, res) => {
   const { name } = req.query;
  try {
    
      let countryName = await Countries.findAll({
          where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
          },   
          attributes: ['flag', 'name', 'id','idL', 'continent', 'population', 'area', 'capital'],
      })
      
      if(name){
          countryName.length > 0 ? res.send(countryName): 
          res.status(404).send('The entered country does not exist.');
          
      }else{
          const dbInfo = await Countries.findAll({
              attributes: ['flag', 'name', 'id','idL', 'continent', 'population', 'capital', 'area'], 
              include : TouristActs          
          })
          res.send(dbInfo); 
      }        
  } catch (error) {
      res.send(error);
  }
  
}; */

module.exports = {
  getApiInfo,
  getById,
  getByName,
};
