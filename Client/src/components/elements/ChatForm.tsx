import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Socket } from "socket.io-client";

type ChatFormTypes = {
  socket: Socket;
};

const ChatForm = ({ socket }: ChatFormTypes) => {
  const [msgContent, setMsgContent] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const messageData = {
      added: new Date(),
      userMessage: formData.get("userMessage"),
    };

    socket.emit("message", { messageData });
    setMsgContent("");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-4/6 h-1/6 items-center">
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
