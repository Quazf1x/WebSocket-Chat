import ChatForm from "../elements/ChatForm.tsx";
import ChatBody from "../elements/ChatBody.tsx";
import RoomsBody from "../elements/RoomsBody.tsx";
import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";

type BoardType = {
  socket: Socket;
  username: string;
};

const Board = ({ socket, username }: BoardType) => {
  const [roomName, setRoomName] = useState("General Chat");
  socket.auth = { username };
  socket.connect();

  useEffect(() => {
    const handleConnectionErr = (err: any) => {
      // the reason of the error, for example "xhr poll error"
      console.log(err.message);

      // some additional description, for example the status code of the initial HTTP response
      console.log(err.description);

      // some additional context, for example the XMLHttpRequest object
      console.log(err.context);
    };

    socket.on("connect_error", (err) => handleConnectionErr(err));
    return () => {
      socket.off("connect_error", (err) => handleConnectionErr(err));
    };
  }, [socket]);

  return (
    <div className="flex md:flex-wrap flex-col md:flex-row base-wrapper p-10 pr-2 w-full m-2 md:m-0 md:w-[clamp(600px,90%,1200px)]">
      <div className="h-full md:h-5/6 md:w-4/6 overflow-y-auto">
        <h1 className="text-4xl font-semibold mb-7">
          {roomName}, as <span>{username}</span>
        </h1>
        <ChatBody username={username} roomName={roomName} socket={socket} />
      </div>
      <div className="overflow-y-auto md:h-5/6 md:p-10 pt-4 md:w-2/6 flex justify-center md:flex-col order-4 md:order-none flex-row flex-wrap md:flex-nowrap gap-2 md:gap-4">
        <RoomsBody roomNameSetter={setRoomName} socket={socket} />
      </div>
      <ChatForm socket={socket} />
    </div>
  );
};

export default Board;
