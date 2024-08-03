import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

//const corsOptions = {
//  origin: ["http://localhost:5173"],
//};

//app.use(cors(corsOptions));

const PORT = 3000;

const expressServer = app.listen(PORT, () =>
  console.log("Server started on PORT " + PORT)
);

const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  console.log(socket.handshake.auth.username);
});
