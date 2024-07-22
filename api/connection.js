const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const db = process.env.DB_NAME.replace("<password>", process.env.DB_PASS);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log("Error while connecting to the Database: ", e));
