const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");

//dotenv config
dotenv.config();

//mongoconnection
connectDb();

//rest object

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//app routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));

//port
const PORT = process.env.PORT || 8081;

//listen
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgCyan.white);
});
