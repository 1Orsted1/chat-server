const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema({
  codigoSala: String,
  contenido: [
    {
      // nombreRedactor: String,
      // value: String,
      // sent_at: {
      //   type: Date,
      //   default: new Date(),
      // },
    },
  ],
})

module.exports = mongoose.model("Message", MessageSchema);
