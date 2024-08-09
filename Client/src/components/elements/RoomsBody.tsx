import Room from "../reUsables/Room.tsx";
import { useEffect, useState } from "react";

type RoomTypes = {
  name: string;
  id: string;
};

const RoomsBody = () => {
  const [rooms, setRooms] = useState<RoomTypes[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/");

      const data = await response.json();
      console.log(data);
      setRooms(data);
    };
    getData();
  }, []);

  return (
    <div className="overflow-y-auto h-5/6 p-10 pt-4 w-2/6 flex flex-col gap-4">
      {rooms ? (
        rooms.map((room) => <Room key={room.id} name={room.name} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomsBody;
