import { format } from "date-fns";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import rooms from "./rooms.js";

const app = express();

const PORT = 3000;

const expressServer = app.listen(PORT, () =>
  console.log("Server started on PORT " + PORT)
);

const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const corsOptions = {
  origin: ["http://localhost:5173", "*"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send(rooms));

const userState = {
  users: [],
  setUsers: function (newUserArr) {
    this.users = newUserArr;
  },
};

io.use((socket, next) => {
  socket.username = socket.handshake.auth.username;
  next();
});

io.on("connection", (socket) => {
  console.log(
    `User id: ${socket.id.substring(0, 4)} Username: ${
      socket.username
    } connected`
  );
  socket.join(rooms[0].id);

  setUser(socket.id, socket.username, Array.from(socket.rooms)[1]);

  const connectionMessage = buildMessage(
    new Date(),
    `${socket.username} has joined the room`,
    "ADMIN"
  );

  io.emit("newConnection", { messageData: connectionMessage });

  socket.on("message", ({ messageData }) => {
    const formattedMessage = buildMessage(
      messageData.added,
      messageData.userMessage,
      socket.username
    );
    const user = findUser(socket.id);
    io.in(user.room).emit("message", { messageData: formattedMessage });
  });

  socket.on("roomChange", ({ roomId }) => {
    const user = findUser(socket.id);
    const prevRoom = user.room;
    socket.leave(prevRoom);

    socket.join(roomId);
    setUser(user.id, user.name, roomId);

    socket.emit("roomChange");
  });

  socket.on("disconnect", () => {
    const message = `User ${socket.username} disconnected`;
    removeUser(socket.id);

    console.log(message);

    const formattedMessage = buildMessage(new Date(), message, "ADMIN");
    io.emit("userDisconnected", { messageData: formattedMessage });
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });
});

const buildMessage = (date, message, username) => {
  return {
    added: format(date, "HH:mm, dd.MM.y"),
    userMessage: message,
    username: username,
  };
};

const setUser = (id, name, room) => {
  const newUser = { id, name, room };
  userState.setUsers([
    ...userState.users.filter((newUser) => newUser.id !== id),
    newUser,
  ]);
  return newUser;
};

const findUser = (id) => {
  return userState.users.find((user) => user.id === id);
};

const removeUser = (id) => {
  return userState.setUsers(userState.users.filter((user) => user.id !== id));
};
