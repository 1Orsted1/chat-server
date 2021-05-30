const Theme = require("../models/theme.js");

const newOne = async (req, res) => {
  console.log("llego");
  const theme = new Theme();
  const { name, date } = req.body;
  theme.name = name;
  theme.date = date;

  if (!name || !date) {
    res.status(404).send({ message: "Todos los datos son obligatorios" });
  } else {
    console.log("tema almacenado correctamente");
    await theme.save((err, themeStored) => {
      if (err) {
        res.status(500).send({ message: "Error con la base de datos" });
      } else {
        if (!themeStored) {
          res.status(404).send({ message: "Error al crear el tema" });
        } else {
          res.status(200).send({ theme: themeStored });
        }
      }
    });
  }
};

const getThemes = async (req, res) => {
  console.log("entro")
  const themes = await Theme.find();
  res.status(200).send({ Themes: themes });
};
module.exports = {
  newOne,
  getThemes,
  //  prueva,
};
