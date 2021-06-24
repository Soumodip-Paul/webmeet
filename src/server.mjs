import express from "express";
import path from "path";
import { ExpressPeerServer } from "peer";
import http from "http"
import Server from "socket.io";
import {database} from "./database.mjs";
import __dirname from "./defaultPath.js";
// import { v4 as uuidv4 } from "uuid";
// import https from 'https';
const app = express();
const server = http.createServer(app);
app.set("view engine", "ejs");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const io = Server(server 
,{
  cors: {
    origin: '*'
  }
}
);
app.use("/peerjs", peerServer);
app.use(express.static("public"));

app.get("/", (req, res) => {
  database(req,res)
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
