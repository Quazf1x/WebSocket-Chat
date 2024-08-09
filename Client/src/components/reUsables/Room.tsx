import { RoomTypes } from "../../Utils/Types";

type RoomButtonTypes = RoomTypes & {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Room = ({ id, name, onClick }: RoomButtonTypes) => {
  return (
    <button
      onClick={onClick}
      data-roomid={id}
      className="flex items-center rounded-lg bg-gray-500/15 pl-2 min-h-14 text-lg transition-all hover:translate-x-2 active:scale-95"
    >
      {name}
    </button>
  );
};

export default Room;
