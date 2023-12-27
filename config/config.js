const mongoose = require("mongoose");
require("colors");

//connectdb

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo db connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`ERROR: ${error.message}`.bgRed);
    process.exit(1);
  }
};

//export
module.exports = connectDb;
