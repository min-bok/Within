import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import style from "styled-components";
import ReactDOM from "react-dom";

const socket = io();

export default function Chat() {
  const [roomName, setRoomName] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat([...chat, msg]);
  }, [chat]);

  const showRoom = () => {
    setShow(true);
  };

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    socket.emit("enter_room", roomName, showRoom);
    setRoomName("");
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // console.log("222");
    socket.emit("chat", roomName);
    // setRoomName("");
  };

  // socket.on("welcome", () => {});

  return (
    <>
      {show ? (
        <Room>
          <ul>
            <li></li>
          </ul>
          <form onSubmit={handleChatSubmit}>
            <input
              type="text"
              placeholder="메세지 입력창"
              onChange={(e) => setMsg(e.target.value)}
            />
            <button>전송</button>
          </form>
        </Room>
      ) : (
        <Welcome>
          <form onSubmit={handleRoomSubmit}>
            <input
              type="text"
              value={roomName}
              onChange={handleRoomName}
              placeholder="방이름"
              required
            />
            <button>방 입장하기</button>
          </form>
        </Welcome>
      )}
    </>
  );
}

const Welcome = styled.div``;
const Room = styled.div``;
