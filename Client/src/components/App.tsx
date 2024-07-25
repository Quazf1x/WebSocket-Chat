import LogIn from "./LogIn.tsx";
import Board from "./Board.tsx";
import { useState } from "react";

const App = () => {
  const [isLogIn, setLogIn] = useState(true);

  const onLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogIn(true);
  };

  return (
    <main
      className="h-svh bg-300%
    animate-gradbg bg-gradient-to-tr from-violet-500 via-rose-300 to-orange-300
    flex justify-center items-center"
    >
      {isLogIn ? <Board /> : <LogIn onLogIn={onLogIn} />}
    </main>
  );
};

export default App;
