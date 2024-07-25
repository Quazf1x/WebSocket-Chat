import Message from "./Message.tsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { MessageTypes } from "../Utils/Types.ts";

type BoardType = {
  username: string;
};

const Board = ({ username }: BoardType) => {
  const [data, setData] = useState<null | MessageTypes[]>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/");

      const data = await response.json();
      console.log(data);
      setData(data);
    };
    getData();
  }, []);

  return (
    <div className="base-wrapper p-10 w-[clamp(600px,90%,1200px)]">
      <div className="h-5/6 overflow-y-auto">
        {data ? (
          data.map((msg) => (
            <Message
              key={msg.id}
              added={msg.added}
              text={msg.text}
              user={msg.user}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <form method="POST" action="/" className="flex items-center">
        <input id="username" value={username} hidden />
        <textarea
          id="user-message"
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
