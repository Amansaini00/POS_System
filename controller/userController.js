const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//login
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validation
    if (!userId || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password", // Update the message
      });
    }

    // Password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};
//register
const registerController = async (req, res) => {
  try {
    const { name, userId, password } = req.body;
    //validation
    if (!name || !userId || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ userId });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPasswor = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ name, userId, password: hashedPasswor });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};
module.exports = { loginController, registerController };
