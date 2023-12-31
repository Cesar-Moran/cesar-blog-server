const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(postRoutes);

const port = process.env.LISTEN_PORT;

app.listen(port, () => {
  console.log(`Server listening port: ${port}`);
});
