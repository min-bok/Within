import "./App.css";

function App() {
  // socket은 서버로의 연결을 의미함
  const socket = new WebSocket("ws://localhost:5000");
  // const socket = new WebSocket(`ws://${window.locati}`);

  // connection이 open 되었을 때 실행될 이벤트
  socket.addEventListener("open", () => {
    console.log("서버와 성공적으로 연결됨!");
  });

  // 서버로부터 메시지를 받았을 때 실행될 이벤트
  socket.addEventListener("message", (message) => {
    console.log("서버로부터 받아온 메세지임", message.data);
  });

  // 서버가 오프라인이 되었을 때 실행될 이벤트
  socket.addEventListener("close", () => {
    console.log("서버와 연결끊김");
  });

  setTimeout(() => {
    socket.send("안녕 나는 브라우저야!");
  }, 3000);

  return <p>안녕!</p>;
}

export default App;
