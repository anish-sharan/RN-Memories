const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/api");
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const mongoURL = process.env.DB;

const Schema = mongoose.Schema;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.get("/", auth, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `your email ${req.user.email}` });
});

app.use("/api", routes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running", PORT);
});
