const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");

//config
dotenv.config();
connectDb();

//seeder function
const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items); // Fix typo here
    console.log("All items are inserted".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

// Call the seeder function
importData();
