require("dotenv/config");
const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to get users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to get user' });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await userService.createUser(fullname, email, password);
    res.status(201).json({ created: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, payload } = await userService.loginUser(email, password);
    res.status(200).json({ msg: "Login success", token, ...payload });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateUser = async (req ,res) => {
  try {
    const { userId } = req.params;
    const { fullname, email, password, deleted } = req.query;
    const userData = { fullname, email, password, deleted };
    
    const updatedUser = await userService.updateUser(userId, userData);
    if (updatedUser) {
      res.json({ modified: true });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An error has been raised", error: error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  loginUser,
};