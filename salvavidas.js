const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { addUser, getUser, deleteUser, getUsers } = require("./users");

const PORT = 5000 || process.env.PORT;

var server = http.createServer(app);

var io = require("socket.io")(server, {
    cors: {
        origin: "*",
  },
});

//Middleware
app.use(express.json());
app.use(cors());

//var client = {};

// io.on("connection", (socket) => {
//   console.log("connected");
//   console.log(socket.id, "has joined");

//   socket.on("/login", (id) => {
//     console.log(id);
//     client[id] = socket;
//   });

// socket.on("/message1", (msg) => {
//   console.log(msg);
//   let targetId = msg.targetId;
//   if (client[targetId]) {
//     console.log("el mensaje se envio");
//     client[targetId].emit("/message1", msg);
//   }
// });

// socket.on("username", function (username) {
//   socket.username = username;
//   console.log(socket.username);
//   io.emit("isOnline", socket.username);
// });
// });

io.on("connection", (socket) => {
  //socket.on("login", ({ user, room }, x) => {});

  socket.on("login", ({ name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
      if (error) return error; //callback(error);
    socket.join(user.room);
    socket.in(room).emit("notification", {
      title: "Someone's here",
      description: `${user.name} just entered the room`,
    });
    io.in(room).emit("users", getUsers(room));
      //callback();
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    io.in(user.room).emit("message", { user: user.name, text: message });
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

app.get("/", (req, res) => {
  req.send("El servidor está en funcionamiento");
});

var address = "0.0.0.0";
server.listen(PORT, address, () => {
  console.log(`server running on port: ${PORT}  ${address}`);
});
