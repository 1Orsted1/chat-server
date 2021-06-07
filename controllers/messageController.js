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

const oneMore = async (codigoS, value) => {
  const grupos = Message.updateOne(
    { codigoSala: codigoS },
    {
      $push: {
        contenido: value,
      },
    }
  );
  return grupos;
};

const addMessage = async (req, res) => {
  const { value, codigoS } = req.body;

  var discrepancy = null;
  discrepancy =
    value == undefined
      ? "Se necesitan los datos del mensaje "
      : discrepancy;
  discrepancy =
    codigoS == undefined
      ? "Se necesita el codigo de la sala para esta operacion"
      : discrepancy;

  if (discrepancy != null) res.status(404).send({ message: discrepancy });
  else {
    const response = await oneMore(codigoS, value);
    if (response.nModified === 1 && response.ok === 1) {
      res.status(200).send({
        message: `Nuevo mensaje!!`,
      });
    } else {
      res.status(404).send({
        message: `NO se guardo el mensaje`,
      });
    }
  }
};

module.exports = { newMessageContainer, getMessages, addMessage };
