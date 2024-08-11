import ChatForm from "../elements/ChatForm.tsx";
import ChatBody from "../elements/ChatBody.tsx";
import RoomsBody from "../elements/RoomsBody.tsx";
import { Socket } from "socket.io-client";
import { useState } from "react";

type BoardType = {
  socket: Socket;
  username: string;
};

const Board = ({ socket, username }: BoardType) => {
  const [roomName, setRoomName] = useState("General Chat");
  socket.auth = { username };
  socket.connect();

  return (
    <div className="flex flex-wrap base-wrapper p-10 pr-2 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 w-4/6 overflow-y-auto">
        <h1 className="text-4xl font-semibold mb-7">
          {roomName}, as <span>{username}</span>
        </h1>
        <ChatBody socket={socket} />
      </div>
      <RoomsBody roomNameSetter={setRoomName} socket={socket} />

      <ChatForm socket={socket} />
    </div>
  );
};

export default Board;
