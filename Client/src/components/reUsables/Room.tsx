type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  return (
    <button className="flex items-center rounded-lg bg-gray-500/15 pl-2 h-14 text-lg hover:translate-x-2 transition-all">
      {name}
    </button>
  );
};

export default Room;
