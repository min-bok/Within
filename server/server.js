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

// fake database
const sockets = [];

// socket은 연결된 브라우저를 의미함
wss.on("connection", (socket) => {
  // 누군가 서버에 접속하면 connection을 저장함
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  // socket의 메서드, socket으로의 직접적인 연결을 제공함
  console.log("브라우저와 성공적으로 연결됨!");

  // 브라우저와의 연결이 종료됐을때
  socket.on("close", () => {
    console.log("브라우저와 연결끊김 ㅠㅠ");
  });

  // 메시지 전송: 브라우저 to 서버
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);

    // 메세지 타입에 따른 분리
    switch (message.type) {
      case "new_msg":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }

    console.log(socket.nickname);
  });
});

server.listen(5000, () => {
  console.log("Listening Server");
});
