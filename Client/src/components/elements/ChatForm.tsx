import { useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Socket } from "socket.io-client";

type ChatFormTypes = {
  socket: Socket;
  username: string;
};

const ChatForm = ({ socket, username }: ChatFormTypes) => {
  const [msgContent, setMsgContent] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const messageData = {
      added: format(new Date(), "HH:mm, dd.MM.y"),
      username: formData.get("username"),
      userMessage: formData.get("userMessage"),
    };
    socket.emit("message", { messageData });
    setMsgContent("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-5/6 h-1/6 items-center">
      <input id="username" name="username" value={username} readOnly hidden />
      <textarea
        id="user-message"
        name="userMessage"
        placeholder="Type here..."
        value={msgContent}
        onChange={(e) => setMsgContent(e.target.value)}
        className="w-11/12 h-20 mt-4 p-2 text-lg bg-white/30 shadow-md rounded-md resize-none focus:outline-white/25"
      />
      <button type="submit" className="text-3xl mt-3 ml-5">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default ChatForm;
