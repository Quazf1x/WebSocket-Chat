import { useEffect, useState } from "react";
import Message from "../reUsables/Message.tsx";
import AdminMessage from "../reUsables/AdminMessage.tsx";
import { MessageTypes } from "../../Utils/Types.ts";
import { Socket } from "socket.io-client";

type ChatBodyType = {
  socket: Socket;
  username: string;
  roomName: string;
};

type updateMessageStateTypes = {
  messageData: MessageTypes;
  prevMessages: MessageTypes[];
};

const ChatBody = ({ socket, username, roomName }: ChatBodyType) => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  const getLocalStorageKey = () => `messages_${username}_${roomName}`;

  const saveMessagesToLocalStorage = (messages: MessageTypes[]) => {
    const key = getLocalStorageKey();
    localStorage.setItem(key, JSON.stringify(messages));
  };

  const loadMessagesFromLocalStorage = () => {
    const key = getLocalStorageKey();
    const savedMessages = localStorage.getItem(key);
    return savedMessages ? JSON.parse(savedMessages) : [];
  };

  const updateMessageState = ({
    messageData,
    prevMessages,
  }: updateMessageStateTypes) => {
    const updatedMessages = [messageData, ...prevMessages];
    saveMessagesToLocalStorage(updatedMessages);
    return updatedMessages;
  };

  useEffect(() => {
    console.log("useEffect fired");
    const initialMessages = loadMessagesFromLocalStorage();
    setMessages(initialMessages);

    const handleMessage = ({ messageData }: { messageData: MessageTypes }) => {
      setMessages((prevMessages) =>
        updateMessageState({ messageData, prevMessages })
      );
    };

    const handleRoomChange = () => {
      console.log("room changed");
      setMessages(loadMessagesFromLocalStorage());
    };

    const handleNewConnection = ({
      messageData,
    }: {
      messageData: MessageTypes;
    }) => {
      setMessages((prevMessages) =>
        updateMessageState({ messageData, prevMessages })
      );
    };

    const handleDisconnection = ({
      messageData,
    }: {
      messageData: MessageTypes;
    }) => {
      setMessages((prevMessages) =>
        updateMessageState({ messageData, prevMessages })
      );
    };

    socket.on("message", handleMessage);
    socket.on("roomChange", handleRoomChange);
    socket.on("newConnection", handleNewConnection);
    socket.on("userDisconnected", handleDisconnection);

    return () => {
      socket.off("message", handleMessage);
      socket.off("roomChange", handleRoomChange);
      socket.off("newConnection", handleNewConnection);
      socket.off("userDisconnected", handleDisconnection);
    };
  }, [socket, username, roomName]);

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
