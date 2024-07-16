const LogIn = () => {
  return (
    <div className="h-5/6 w-[clamp(400px,50%,700px)] p-4 flex gap-5 flex-col justify-center items-center bg-gray-100/85 rounded-3xl">
      <h1 className="text-3xl text-center font-bold upp">
        Enter your username to begin chatting!
      </h1>
      <form className="*:m-5 flex flex-col items-center w-4/6 ">
        <input
          required
          className="h-16 w-full p-2 text-2xl  outline-violet-500 border-b-4 border-b-violet-500 rounded-tr-lg rounded-tl-lg"
        />
        <button
          className="max-w-72 font-semibold bg-violet-500 p-5 rounded-2xl text-white w-full text-xl transition-all hover:opacity-90 active:scale-95"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
