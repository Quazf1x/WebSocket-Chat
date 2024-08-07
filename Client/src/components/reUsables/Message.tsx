import Avatar from "boring-avatars";
import { MessageTypes } from "../../Utils/Types";

const Message = ({ added, userMessage, username }: MessageTypes) => {
  return (
    <div className="flex bg-slate-400/20 mt-4 mb-4 min-h-28 p-4 rounded-xl">
      <Avatar name={username} variant="beam" />
      <div className="h-full w-full leading-8 ml-2">
        <div className="flex *:mr-2 text-center">
          <p className="text-2xl font-semibold">{username}, </p>
          <p>{added}</p>
        </div>
        <p className="break-all mt-1 text-lg">{userMessage}</p>
      </div>
    </div>
  );
};

export default Message;
