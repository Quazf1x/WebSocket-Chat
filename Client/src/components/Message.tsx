const Message = () => {
  return (
    <div className="flex items-center bg-slate-400/20 mt-4 mb-4 min-h-16 p-1">
      <img
        className="h-12 w-12 mr-3"
        src="https://avatar.iran.liara.run/public/18"
      />
      <div className="h-full w-full">
        <div className="flex *:mr-2">
          <p>Username, </p>
          <p>21.07.2024</p>
        </div>
        <p>Lorem</p>
      </div>
    </div>
  );
};

export default Message;
