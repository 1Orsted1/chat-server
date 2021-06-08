const Room = require("../models/rooms");

const newRoom = (req, res) => {
  const room = new Room();
  const props = req.body;
  room.idGrupo = props.idG;
  room.nombreSala = props.nombre;
  room.contenido = props.contenido;

  var discrepancy = null;
  discrepancy =
    props.contenido == undefined
      ? "Se tiene que especificar algo del contenido del room (link, texto, img)"
      : discrepancy;
  discrepancy =
    props.nombre == undefined
      ? "Se necesita un nombre para el room"
      : discrepancy;
  discrepancy =
    props.idG == undefined
      ? "Se necesita el id del grupo al que pertenecera la sala"
      : discrepancy;
  if (discrepancy != null) res.status(404).send({ message: discrepancy });
  else {
    room.save((err, stored) => {
      if (err) res.status(500).send({ message: `error del servidor: ${err}` });
      else if (!stored)
        res.status(404).send({ message: "error al crear la sala" });
      else
        res.status(200).send({
          message: "sala creada correctamente",
          Room: stored,
        });
    });
  }
};

function getRoom(req, res) {
  const query = req.query;
  if (query.idRoom.match(/^[0-9a-fA-F]{24}$/)) {
    Room.find({ _id: query.idRoom }).then((room) => {
      if (!room[0]) {
        res.status(404).send({ message: "no se ha encontrado ninguna sala" });
      } else {
        res.status(200).send({ room });
      }
    });
  } else {
    res.status(500).send({ message: "El id es incorrecto" });
  }
}

function getAllRooms(req, res) {
  const query = req.query;
  if (query.idGrupo.match(/^[0-9a-fA-F]{24}$/)) {
    Room.find({ idGrupo: query.idGrupo }).then((room) => {
      if (!room[0]) {
        res.status(404).send({ message: "no se ha encontrado ninguna sala" });
      } else {
        res.status(200).send({ room });
      }
    });
  } else {
    res.status(500).send({ message: "El id es incorrecto" });
  }
}

module.exports = { newRoom, getRoom, getAllRooms };
