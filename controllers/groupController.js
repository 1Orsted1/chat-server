const Group = require("../models/groups");
const { getCodigoGrupo } = require("../bin/codeHandler.js");

const newGroup = (req, res) => {
  const { nombreGrupo, creador, carrera, categoria, cupo } = req.body;
  const group = new Group();
  group.nombre = nombreGrupo; //
  group.creador = creador; //
  group.carrera = carrera; //
  group.categoria = categoria; //
  group.maximoIntegrantes = cupo; //
  group.integrantes = [];

  var discrepancy = null;
  discrepancy =
    cupo == undefined
      ? "Se necesita especificar un cupo maximo de personas "
      : discrepancy;
  discrepancy =
    categoria == undefined ? "Se necesita una categoria de grupo" : discrepancy;
  discrepancy =
    carrera == undefined
      ? "Se necesita especificar la carrera del grupo"
      : discrepancy;
  discrepancy =
    creador == undefined
      ? "Se necesita el nombre de usuario creador del grupo"
      : discrepancy;
  discrepancy =
    nombreGrupo == undefined ? "Se necesita el nombre del grupo" : discrepancy;

  if (discrepancy != null) res.status(404).send({ message: discrepancy });
  else {
    group.codigoGrupo = getCodigoGrupo({ nombreGrupo, creador, carrera });
    group.save((err, stored) => {
      if (err) res.status(500).send({ message: `error del servidor: ${err}` });
      else if (!stored)
        res.status(404).send({ message: "error al crear el grupo" });
      else
        res.status(200).send({
          message: "grupo creado correctamente",
          group: stored,
        });
    });
  }
};

const getMyGroups = (req, res) => {
  const query = req.query;
  Group.find({ integrantes: { $all: [query.usuario] } }).then((groups) => {
    if (!groups[0]) {
      res
        .status(404)
        .send({ message: `${query.usuario} no es integrante de ningun grupo` });
    } else {
      res.status(200).send({ groups });
    }
  });
};

const getMyOwnGroups = (req, res) => {
  const query = req.query;
  Group.find({ creador: query.usuario }).then((groups) => {
    if (!groups[0]) {
      res
        .status(404)
        .send({ message: `${query.usuario} no ha creado ningun grupo` });
    } else {
      res.status(200).send({ groups });
    }
  });
};

const oneMore = async (grupo, value) => {
  const grupos = await Group.updateOne(
    { codigoGrupo: grupo },
    { $inc: { numeroIntegrantes: 1 }, $push: { integrantes: value } }
  );
  return grupos;
};

const addUser = async (req, res) => {
  const { usuario, codigoG } = req.body;

  var discrepancy = null;
  discrepancy =
    usuario == undefined
      ? "Se necesita el nombre de usuario del nuevo integrante "
      : discrepancy;
  discrepancy =
    codigoG == undefined
      ? "Se necesita el codigo grupo para esta operacion"
      : discrepancy;

  if (discrepancy != null) res.status(404).send({ message: discrepancy });
  else {
    const response = await oneMore(codigoG, usuario);
    if (response.nModified === 1 && response.ok === 1) {
      res.status(200).send({
        message: `Se ha incluido al grupo con el codigo: "${codigoG}"`,
      });
    } else {
      res.status(404).send({
        message: `NO se ha podido unir al grupo con el codigo: "${codigoG}"`,
      });
    }
  }
};

module.exports = {
  newGroup,
  getMyGroups,
  getMyOwnGroups,
  addUser,
};
