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

const getMessages = (req, res) => {
  const query = req.query;
  Message.find({ codigoSala: query.codigo }).then((message) => {
    if (!message[0]) {
      res.status(404).send({ message: `contenedor de mensajes inexistente` });
    } else {
      res.status(200).send({ message });
    }
  });
};

module.exports = { newMessageContainer, getMessages };
