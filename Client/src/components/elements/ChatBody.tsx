import { useEffect, useState } from "react";
import Message from "../reUsables/Message.tsx";
import { MessageTypes } from "../../Utils/Types.ts";
import { Socket } from "socket.io-client";

type ChatBodyType = {
  socket: Socket;
};

const ChatBody = ({ socket }: ChatBodyType) => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);

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

  useEffect(() => {
    console.log("1");
    socket.on("newConnection", () => console.log("got new connection"));
  }, [socket]);
  return (
    <>
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
    </>
  );
};

export default ChatBody;
