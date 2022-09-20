const { Country, Activity } = require("../db");

const getDbActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: Country,
    });
    return res.json(activities);
  } catch (error) {console.log(error)}
};

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season } = req.body;
  if (!name || !difficulty || !duration || !season)
    res.status(400).json({ msg: "Faltan ingresar datos" });
  try {
    const obj = { name, difficulty, duration, season };
    const newAct = await Activity.create(obj);
    const addCountry = await Country.findOne({
      where: {
        name,
      },
    });
    await newAct.addCountry(addCountry);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};
/* const createActivity= async(req,res)=>{
  const{name, difficulty, duration, season, countries}= req.body;
      try{
          const newActivity= await Activity.create({
              name,
              difficulty,
              duration,
              season
          });
          for(const i of countries){
              const countryAct= await Country.findOne({
                  where:{
                      name: i
                  }
              })
              await newActivity.addCountry(countryAct);
          };
          res.send('Activity created Successfully!');
      }catch(error){
          res.send(error);
      }
};
 */

module.exports = {
  getDbActivities,
  createActivity,
};
