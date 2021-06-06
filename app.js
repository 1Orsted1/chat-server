const http = require("http");
const { addUser, getUser, deleteUser, getUsers } = require("./users.js");
const express = require("express");
const cors = require("cors");
const app = express();
const { API_VERSION } = require("./config");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users.js");
const newTheme = require("./routes/newTheme");
const groupRoutes = require("./routes/groups.js")
const roomRoutes = require("./routes/rooms.js")
const messageRoutes = require("./routes/messages.js")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Aqui es a como se veran las rutas en el servidor:
//app.use(`/api/${API_VERSION}`, authRoutes);
//app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, newTheme);
app.use(`/api/${API_VERSION}`, groupRoutes);
app.use(`/api/${API_VERSION}`, roomRoutes);
app.use(`/api/${API_VERSION}`, messageRoutes);


/////////////////////////////////////////
///////////sockets Events///////////////
///////////////////////////////////////

var server = http.createServer(app);

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



module.exports = { server, app };
