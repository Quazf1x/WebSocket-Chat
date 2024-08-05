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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const messageData = {
      added: format(new Date(), "k:m, dd.MM.y"),
      username: formData.get("username"),
      userMessage: formData.get("userMessage"),
    };
    console.log(messageData);
    socket.emit("new message", { messageData });
  };

  useEffect(() => {
    socket.on("new message", ({ messageData }) => {
      setMessages([...messages, messageData]);
    });
  }, []);

  return (
    <div className="flex flex-wrap base-wrapper p-10 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 w-5/6 overflow-y-auto">
        {messages ? (
          messages.map((msg, i) => (
            <Message
              key={`${msg.user} msg #${i}`}
              added={msg.added}
              text={msg.text}
              user={msg.user}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="w-1/6 border flex flex-col gap-4">
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
