import Room from "../reUsables/Room.tsx";
import ChatForm from "../elements/ChatForm.tsx";
import { Socket } from "socket.io-client";
import ChatBody from "../elements/ChatBody.tsx";

type BoardType = {
  socket: Socket;
  username: string;
};

const Board = ({ socket, username }: BoardType) => {
  socket.auth = { username };
  socket.connect();

  return (
    <div className="flex flex-wrap base-wrapper p-10 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 w-5/6 overflow-y-auto">
        <h1 className="text-4xl font-semibold mb-7">
          General Chat, as <span>{username}</span>
        </h1>
        <ChatBody socket={socket} />
      </div>
      <div className="pt-4 pl-2 w-1/6 flex flex-col gap-4">
        <Room name="General Chat" />
        <Room name="Room 2" />
        <Room name="Room 3" />
      </div>
      <ChatForm socket={socket} username={username} />
    </div>
  );
};

export default Board;
