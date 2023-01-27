import "./App.css";

function App() {
  // socket은 서버로의 연결을 의미함
  const socket = new WebSocket("ws://localhost:5000");
  // const socket = new WebSocket(`ws://${window.locati}`);

  socket.addEventListener("open", () => {
    console.log("서버와 성공적으로 연결됨!");
  });

  socket.addEventListener("message", (message) => {
    console.log("서버로부터 받아온 메세지임", message.data);
  });

  socket.addEventListener("close", () => {
    console.log("서버와 연결끊김");
  });

  return <p>안녕!</p>;
}

export default App;
