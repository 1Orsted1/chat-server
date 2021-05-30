const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  usuario: {
    type: String,
    unique: true,
  },
  nombre: String,
  apellido_P: String,
  apellido_M: String,
  carrera: String,
  clave: String,
  email: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
