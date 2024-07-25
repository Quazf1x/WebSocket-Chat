type LogInType = {
  onLogIn: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LogIn = ({ onLogIn }: LogInType) => {
  return (
    <div className="base-wrapper w-[clamp(400px,50%,700px)] p-4 flex gap-5 flex-col justify-center items-center">
      <h1 className="text-2xl text-center font-bold upp">
        Enter your username to begin chatting!
      </h1>
      <form onSubmit={onLogIn} className="flex flex-col items-center w-5/6">
        <input
          required
          className="h-24 w-full mt-4 p-2 text-4xl outline-violet-500 border-b-4 border-b-violet-500 rounded-tr-lg rounded-tl-lg"
        />
        <button
          className="max-w-52 mt-7 align-bottom self-end font-semibold bg-violet-500 p-3 rounded-2xl text-white w-full text-xl transition-all hover:opacity-90 active:scale-95"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
