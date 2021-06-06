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
          group: stored,
        });
    });
  }
};

module.exports = { newRoom };
