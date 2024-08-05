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
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

io.use((socket, next) => {
  socket.username = socket.handshake.auth.username;
  console.log(
    `User id: ${socket.id.toString().substring(0, 4)} Username: ${
      socket.username
    } connected`
  );
});
