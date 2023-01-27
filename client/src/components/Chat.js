import React, { useState } from "react";
import io from "socket.io-client";
import style from "styled-components";

const socket = io();

export default function Chat() {
  const [roomName, setRoomName] = useState("");

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    socket.emit("enter_room", { payload: roomName }, () => {
      console.log("server is done!");
    });
    setRoomName("");
  };

  return (
    <Room>
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
    </Room>
  );
}

const Room = style.div``;
