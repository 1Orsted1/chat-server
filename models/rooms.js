const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomsSchema = Schema({
  idGrupo: String,//Este debe de ser el id del grupo al quepertenece
  nombreSala: String,
  createdAt: { type: Date, default: new Date() },
  contenido: {},
})


module.exports = mongoose.model("Rooms", RoomsSchema);

