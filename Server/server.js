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
    io.emit("message", { messageData: formattedMessage });
  });

  socket.on("roomChange", ({ roomId }) => {
    console.log("room changed to " + roomId);

    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
    socket.join(roomId);
    socket.emit("roomChange");
  });

  socket.on("disconnect", () => {
    const message = `User ${socket.username} has left the room`;
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
