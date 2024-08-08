import { useEffect, useState } from "react";
import Message from "../reUsables/Message.tsx";
import AdminMessage from "../reUsables/AdminMessage.tsx";
import { MessageTypes } from "../../Utils/Types.ts";
import { Socket } from "socket.io-client";

type ChatBodyType = {
  socket: Socket;
};

const ChatBody = ({ socket }: ChatBodyType) => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  useEffect(() => {
    const handleMessage = ({ messageData }: { messageData: MessageTypes }) => {
      console.log(messageData);
      setMessages((prevMessages) => [messageData, ...prevMessages]);
    };

    socket.on("message", handleMessage);
    console.log("useEffect fired");

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    const handleNewConnection = () => {
      const msg = {
        added: "string",
        userMessage: "string",
        username: "ADMIN",
      };
      setMessages((prevMessages) => [msg, ...prevMessages]);
    };

    socket.on("newConnection", handleNewConnection);

    return () => {
      socket.off("newConnection", handleNewConnection);
    };
  }, [socket]);

  return (
    <>
      {messages ? (
        messages.map((msg, i) => (
          <div key={`${msg.username} msg #${i}`}>
            {msg.username === "ADMIN" ? (
              <AdminMessage message={msg.userMessage} />
            ) : (
              <Message
                added={msg.added}
                userMessage={msg.userMessage}
                username={msg.username}
              />
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatBody;
