import { MessageTypes } from "../Utils/Types";

const Message = ({ added, text, user }: MessageTypes) => {
  return (
    <div className="flex bg-slate-400/20 mt-4 mb-4 min-h-28 p-1">
      <img
        className="h-20 w-20 mr-3 self-center"
        src="https://avatar.iran.liara.run/public/18"
      />
      <div className="h-full w-full leading-8">
        <div className="flex *:mr-2 text-center">
          <p className="text-2xl font-semibold">{user}, </p>
          <p>{added.toString().substring(0, 10).replaceAll("-", ".")}</p>
        </div>
        <p className="mt-1 text-lg">{text}</p>
      </div>
    </div>
  );
};

export default Message;
