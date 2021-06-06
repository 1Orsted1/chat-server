const Message = require("../models/messages");

const newMessageContainer = (req, res) => {
  const messageContainer = new Message();
  const { codigoSala } = req.body;
  messageContainer.codigoSala = codigoSala;
  messageContainer.contenido = [];

  if (!codigoSala) {
    res.status(404).send({
      message:
        "Se necesita especificar el id de la sala a la que pertenecera este contenedor de mensajes",
    });
  } else {
    messageContainer.save((err, stored) => {
      if (err) res.status(500).send({ message: `error del servidor: ${err}` });
      else if (!stored)
        res
          .status(404)
          .send({ message: "error al crear el contenedor de mensajes" });
      else
        res.status(200).send({
          message: "contenedor creado con exito",
          group: stored,
        });
    });
  }
};

module.exports = { newMessageContainer };