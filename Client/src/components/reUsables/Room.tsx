type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  return (
    <button className="flex items-center rounded-lg bg-gray-500/15 pl-2 min-h-14 text-lg transition-all hover:translate-x-2 active:scale-95">
      {name}
    </button>
  );
};

export default Room;
