const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("../controller/billsController");

const router = express.Router();

router.post("/add-bills", addBillsController);
router.get("/get-bills", getBillsController);

module.exports = router;
