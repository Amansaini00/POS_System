const billsModel = require("../models/billsModel");

const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send("Bill Created Successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
const getBillsController = async (req, res) => {
  try {
    const Bills = await billsModel.find();
    res.status(200).send(Bills);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addBillsController, getBillsController };
