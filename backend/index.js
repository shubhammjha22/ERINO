const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index.js");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(8000, () => {
  console.log("Server up and running at 8000 port");
});
