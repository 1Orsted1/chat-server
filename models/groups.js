const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = Schema({
  nombre: String,
  fechaCreacion: {
    type: Date,
    default: new Date(),
  },
  creador: String,
  carrera: String,
  categoria: String,
  numeroIntegrantes: {
    type: Number,
    default: 1,
  },
  maximoIntegrantes: Number,
  codigoGrupo: { type: String, unique: true },
  integrantes: [String],
});

module.exports = mongoose.model("Group", GroupSchema);
