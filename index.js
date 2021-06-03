const mongoose = require("mongoose");
const { server } = require("./app.js");
const PORT_SERVER = 5000 || process.env.PORT;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/grupo_estudio`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("conexion a la base de datos exitosa 🌚");
      server.listen(PORT_SERVER, () => {
        console.log("#####################");
        console.log("##### API REST ######");
        console.log("#####################");
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
      });
    }
  }
);
