import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [nickname, setNickname] = useState("");
  // socket은 서버로의 연결을 의미함
  const socket = new WebSocket("ws://localhost:5000");
  // const socket = new WebSocket(`ws://${window.locati}`);

  useEffect(() => {
    connect();
    getMsg();
  }, []);

  // li 엘리먼트 생성
  const createLi = (msg) => {
    return React.createElement("li", null, msg);
  };

  // connection이 open 되었을 때 실행될 이벤트
  const connect = () => {
    socket.addEventListener("open", () => {
      console.log("서버와 성공적으로 연결됨!");
    });
  };

  // 서버로부터 메시지를 받았을 때 실행될 이벤트
  const getMsg = async () => {
    socket.addEventListener("message", (message) => {
      const ul = document.querySelector("ul");
      const li = createLi(message.data).props.children;
      ul.append(li);
    });
  };

  // 서버가 오프라인이 되었을 때 실행될 이벤트
  socket.addEventListener("close", () => {
    console.log("서버와 연결끊김");
  });

  // chat input onChange 핸들링
  const handleMessage = (e) => {
    setMsg(e.target.value);
  };

  // nickname input onChange 핸들링
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const makeMessage = (type, payload) => {
    const msg = { type, payload };
    return JSON.stringify(msg);
  };

  // 서버에 메시지 전송
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send(makeMessage("new_msg", msg));
    const ul = document.querySelector("ul");
    ul.append(`나 ${msg}`);
    setMsg("");
  };

  const handleNickSubmit = (e) => {
    e.preventDefault();
    socket.send(makeMessage("nickname", nickname));
    setNickname("");
  };

  return (
    <>
      <ul></ul>
      <form id="nickname" onSubmit={handleNickSubmit}>
        <input
          type="text"
          onChange={handleNickname}
          value={nickname}
          placeholder="닉네임을 입력하세요."
          required
        />
        <button>저장</button>
      </form>

      <form id="chat" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleMessage}
          value={msg}
          placeholder="메시지를 입력하세요."
          required
        />
        <button>전송</button>
      </form>
    </>
  );
}
