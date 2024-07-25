import LogIn from "./LogIn.tsx";
import Board from "./Board.tsx";
import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState<null | string>(null);

  const onLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.currentTarget;
    const inputValue = (target[0] as HTMLInputElement).value;
    setUsername(inputValue);
  };

  return (
    <main
      className="h-svh bg-300%
    animate-gradbg bg-gradient-to-tr from-violet-500 via-rose-300 to-orange-300
    flex justify-center items-center"
    >
      {username ? <Board username={username} /> : <LogIn onLogIn={onLogIn} />}
    </main>
  );
};

export default App;
