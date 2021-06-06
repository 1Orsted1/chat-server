const User = require("../models/user.js");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

const addUser = (req, res) => {
  const user = new User();
  const {
    usuario,
    nombre,
    apellido_p,
    apellido_m,
    carrera,
    clave,
    repetirClave,
    email,
  } = req.body;

  user.usuario = usuario;
  user.nombre = nombre;
  user.apellido_P = apellido_p;
  user.apellido_M = apellido_m;
  user.carrera = carrera;
  user.clave = clave;
  user.email = email;

  const discrepancia = clave != repetirClave;
  if (
    !clave ||
    !repetirClave ||
    !usuario ||
    !nombre ||
    !apellido_m ||
    !apellido_p ||
    !carrera ||
    !email
  ) {
    res.status(404).send({ message: "Todos los datos son obligatorios" });
  } else {
    if (discrepancia) {
      res.status(404).send({ message: "Las contraseñas no son iguales" });
    } else {
      bcrypt.hash(clave, null, null, function (error, hash) {
        if (error) {
          res.status(500).send({ message: "error al ancripar la contraseña" });
        } else {
          // res.status(200).send({message: hash})
          user.clave = hash;
          user.save((error, userSotored) => {
            if (error) {
              res.status(500).send({ message: `error del servidor: ${error}` });
            } else {
              if (!userSotored) {
                res.status(404).send({ message: "error al crear el usuario" });
              } else {
                res.status(200).send({
                  message: "Usuario creado correctamente",
                  user: userSotored,
                });
              }
            }
          });
        }
      });
    }
  }
};

const searchUser = async (req, res) => {
  var user = new User();
  const { usuario, clave } = req.body;

  User.findOne({ usuario }, (err, userSotored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!userSotored) {
      res.status(404).send({ message: "Usuario no encontrado" });
    } else {
      bcrypt.compare(clave, userSotored.clave, (err, valid) => {
        if (err) {
          res.status(500).send({ message: "Error del servidor" });
        } else if (!valid) {
          res.status(500).send({ message: "La contraseña es incorrecta" });
        } else {
          user._id = userSotored._id;
          user.usuario = userSotored.usuario;
          user.nombre = userSotored.nombre;
          user.apellido_P = userSotored.apellido_P;
          user.apellido_M = userSotored.apellido_M;
          user.carrera = userSotored.carrera;
          user.email = userSotored.email;
          res.status(200).send({
            user,
            accessToken: jwt.createAccesToken(userSotored),
            refreshToken: jwt.createRefreshToken(userSotored),
          });
        }
      });
    }
  });
};

module.exports = {
  searchUser,
  addUser,
};
