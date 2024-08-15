import Room from "../reUsables/Room.tsx";
import { RoomTypes } from "../../Utils/Types.ts";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type RoomsBodyTypes = {
  socket: Socket;
  roomNameSetter: React.Dispatch<React.SetStateAction<string>>;
};

const RoomsBody = ({ socket, roomNameSetter }: RoomsBodyTypes) => {
  const [rooms, setRooms] = useState<RoomTypes[] | null>(null);

  const onRoomChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const roomId = e.currentTarget.dataset.roomid;
    const roomName = e.currentTarget.textContent;
    roomName ? roomNameSetter(roomName) : roomNameSetter("Undefined room");

    socket.emit("roomChange", { roomId });
  };

  useEffect(() => {
    const getData = async () => {
      const fetchURL = import.meta.env.VITE_BACKEND_URL;
      console.log(fetchURL);
      if (!fetchURL) throw new Error(`Invalid URL: ${fetchURL}`);
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log(data);
      setRooms(data);
    };
    getData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default RoomsBody;
