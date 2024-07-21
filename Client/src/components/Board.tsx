import Message from "./Message.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const Board = () => {
  return (
    <div className="base-wrapper p-6 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 overflow-y-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="flex items-center">
        <textarea
          placeholder="Type here..."
          className="w-11/12 h-16 mt-4 p-2 text-lg bg-white/30 shadow-md rounded-md resize-none focus:outline-white/25"
        />
        <button className="text-3xl mt-3 ml-5">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Board;
