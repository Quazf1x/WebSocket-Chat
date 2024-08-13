import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Socket } from "socket.io-client";

type ChatFormTypes = {
  socket: Socket;
};

const ChatForm = ({ socket }: ChatFormTypes) => {
  const [msgContent, setMsgContent] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const onEnterKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && submitBtnRef.current) {
      e.preventDefault();
      submitBtnRef.current.click();
    }
    return false;
  };

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
    <form
      onSubmit={onSubmit}
      className="flex pb-10 md:pb-0 pr-10 md:pr-0 md:w-4/6 h-1/6 items-center"
    >
      <textarea
        required
        id="user-message"
        name="userMessage"
        placeholder="Type here..."
        value={msgContent}
        onChange={(e) => setMsgContent(e.target.value)}
        onKeyDown={onEnterKeyPress}
        className="w-11/12 h-20 mt-4 p-2 text-lg bg-white/30 shadow-md rounded-md resize-none focus:outline-white/25"
      />
      <button type="submit" ref={submitBtnRef} className="text-3xl mt-3 ml-5">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default ChatForm;
