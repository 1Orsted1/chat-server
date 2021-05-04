const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { addUser, getUser, deleteUser, getUsers } = require("./users");
const { API_VERSION } = require("./config");
const bodyParser = require("body-parser");

//aqui de bajo van las rutas ex:
//const authRoutes = require("./routers/auth.js");
//const userRoutes = require("./routers/user.js");
const newTheme = require("./routes/newTheme");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Aqui es a como se veran las rutas en el servidor:
//app.use(`/api/${API_VERSION}`, authRoutes);
//app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, newTheme);

/////////////////////////////////////////
///////////sockets Events///////////////
///////////////////////////////////////

var server = http.createServer(app);
app.use(express.json());
app.use(cors());

//Codigo se socket.io
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("login", ({ name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return error;
    socket.join(user.room);
    socket.in(room).emit("notification", {
      title: "Someone's here",
      description: `${user.name} just entered the room`,
    });
    io.in(room).emit("users", getUsers(room));
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    socket.in(user.room).emit("message", {user: user.name, contentMessage: message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit("notification", {
        title: "Someone just left",
        description: `${user.name} just left the room`,
      });
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });
});

module.exports = { app, server };
