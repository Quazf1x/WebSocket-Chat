import Room from "../reUsables/Room.tsx";
import { RoomTypes } from "../../Utils/Types.ts";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type RoomsBodyTypes = {
  socket: Socket;
};

const RoomsBody = ({ socket }: RoomsBodyTypes) => {
  const [rooms, setRooms] = useState<RoomTypes[] | null>(null);

  const onRoomChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const roomId = e.currentTarget.dataset.roomid;
    socket.emit("roomChange", { roomId });
  };

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
        rooms.map((room) => (
          <Room
            key={room.id}
            onClick={onRoomChange}
            id={room.id}
            name={room.name}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomsBody;
