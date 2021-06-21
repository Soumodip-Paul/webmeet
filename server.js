const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index')
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    console.log(roomId,userId,userName)
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId,socket.id);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected ' + socket.id)
    socket.broadcast.emit('removePeer', socket.id)
})
});

server.listen(process.env.PORT || 3030);
