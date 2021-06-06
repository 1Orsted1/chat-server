const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "boswuj5cru2lg1phuwrod0cam";

exports.createAccesToken = function (user) {
  const payload = {
    id: user._id,
    usuario: user.usuario,
    nombre: user.nombre,
    apellido_P: user.apellido_P,
    apellido_M: user.apellido_M,
    carrera: user.carrera,
    email: user.email,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };
  return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodedToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
