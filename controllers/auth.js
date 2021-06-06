//Este es el EndPoint

const jwt = require("../services/jwt");

const moment = require("moment");

const User = require("../models/user");

function checkExpiredToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const ifIsTokenExpired = checkExpiredToken(refreshToken);
  if (ifIsTokenExpired) {
    res.status(404).send({ message: "El refresh token ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);
    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "usuario no encontrado" });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccesToken(userStored),
            refreshToken: refreshToken,
          });
        }
      }
    });
  }

  console.log(ifIsTokenExpired);
}

module.exports = {
  refreshAccessToken,
};
