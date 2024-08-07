import LogIn from "./LogIn.tsx";
import Board from "./Board.tsx";
import { useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState<null | string>();
  const URL = "http://localhost:3000";

  const socket = io(URL, {
    autoConnect: false,
  });

  const onLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const username = (target[0] as HTMLInputElement).value;

    setUsername(username);
  };

  return (
    <main
      className="h-svh bg-300%
    animate-gradbg bg-gradient-to-tr from-violet-500 via-rose-300 to-orange-300
    flex justify-center items-center"
    >
      {username ? (
        <Board socket={socket} username={username} />
      ) : (
        <LogIn onLogIn={onLogIn} />
      )}
    </main>
  );
};

export default App;
