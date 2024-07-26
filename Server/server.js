const express = require("express");
const app = express();
const cors = require("cors");
const messages = require("./messages");

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.send(messages));
app.post("/", (req, res) => {
  console.log("gott it");
  console.log(new Date().toString());
  console.log(req.body);
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server started on PORT " + PORT));
