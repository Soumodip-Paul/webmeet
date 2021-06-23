const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const { v4: uuidv4 } = require("uuid");
const https = require('https')
app.set("view engine", "ejs");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const io = require("socket.io")(server 
,{
  cors: {
    origin: '*'
  }
}
);
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
app.use(express.static(path.join(__dirname, '..','public')))
app.use(express.static(path.join(__dirname, '..','node_modules')))


server.listen(process.env.PORT || 3000);
