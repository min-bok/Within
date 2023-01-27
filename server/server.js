import http from "http";
import WebSocket from "ws";
import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// http server
const server = http.createServer(app);

// ws server
const wss = new WebSocket.Server({ server });

// socket은 연결된 브라우저를 의미함
wss.on("connection", (socket) => {
  // socket의 메서드, socket으로의 직접적인 연결을 제공함
  console.log("브라우저와 성공적으로 연결됨!");
  socket.send("hello world!");
});

server.listen(5000, () => {
  console.log("Listening Server");
});
