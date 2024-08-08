import express from "express";
import { Server } from "socket.io";
import cors from "cors";
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
  io.emit("newConnection");
  socket.on("message", ({ messageData }) => {
    console.log(messageData);
    io.emit("message", { messageData });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected`);
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });
});
