type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  return (
    <div className="flex items-center rounded-lg bg-gray-500/15 pl-2 h-14 text-lg cursor-pointer hover:translate-x-2 transition-all">
      {name}
    </div>
  );
};

export default Room;
