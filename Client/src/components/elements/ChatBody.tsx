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
    console.log("useEffect fired");

    const handleMessage = ({ messageData }: { messageData: MessageTypes }) => {
      console.log(messageData);
      setMessages((prevMessages) => [messageData, ...prevMessages]);
    };

    const handleNewConnection = ({
      messageData,
    }: {
      messageData: MessageTypes;
    }) => {
      setMessages((prevMessages) => [messageData, ...prevMessages]);
    };

    const handleDisconnection = ({
      messageData,
    }: {
      messageData: MessageTypes;
    }) => {
      setMessages((prevMessages) => [messageData, ...prevMessages]);
    };

    socket.on("message", handleMessage);
    socket.on("newConnection", handleNewConnection);
    socket.on("userDisconnected", handleDisconnection);

    return () => {
      socket.off("message", handleMessage);
      socket.off("newConnection", handleNewConnection);
      socket.off("userDisconnected", handleDisconnection);
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
