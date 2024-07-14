const LogIn = () => {
  return (
    <div className="flex gap-10 flex-col justify-center items-center h-full">
      <h1 className="text-3xl text-center font-bold upp">
        Enter your username to begin chatting!
      </h1>
      <form className="flex flex-col items-center w-1/2">
        <input className="h-12 p-2 text-lg border-b-4 border-b-violet-500" />
        <button
          className="bg-violet-500 p-5 rounded-2xl text-white mt-5 w-full text-xl"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
