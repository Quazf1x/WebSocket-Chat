import Message from "./Message.tsx";
import Room from "./Room.tsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { MessageTypes } from "../Utils/Types.ts";
import { Socket } from "socket.io-client";
import { format } from "date-fns";

type BoardType = {
  socket: Socket;
  username: string;
};

const Board = ({ socket, username }: BoardType) => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  socket.auth = { username };
  socket.connect();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const messageData = {
      added: format(new Date(), "k:m, dd.MM.y"),
      username: formData.get("username"),
      userMessage: formData.get("userMessage"),
    };
    socket.emit("message", { messageData });
  };

  useEffect(() => {
    const handleMessage = ({ messageData }: { messageData: MessageTypes }) => {
      setMessages((prevMessages) => [messageData, ...prevMessages]);
    };

    socket.on("message", handleMessage);
    console.log("useEffect fired");

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-wrap base-wrapper p-10 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 w-5/6 overflow-y-auto">
        {messages ? (
          messages.map((msg, i) => (
            <Message
              key={`${msg.username} msg #${i}`}
              added={msg.added}
              userMessage={msg.userMessage}
              username={msg.username}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="pt-4 pl-2 w-1/6 flex flex-col gap-4">
        <Room name="General Chat" />
        <Room name="Room 2" />
        <Room name="Room 3" />
      </div>
      <form onSubmit={onSubmit} className="flex w-5/6 h-1/6 items-center">
        <input id="username" name="username" value={username} readOnly hidden />
        <textarea
          id="user-message"
          name="userMessage"
          placeholder="Type here..."
          className="w-11/12 h-16 mt-4 p-2 text-lg bg-white/30 shadow-md rounded-md resize-none focus:outline-white/25"
        />
        <button type="submit" className="text-3xl mt-3 ml-5">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default Board;
