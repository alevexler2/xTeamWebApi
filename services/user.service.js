const Users = require("../models/usersModels");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
    const users = await Users.find();
    if (users) {
      return users
    }
    throw new Error('An error has been raised');
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  if (user) {
    return user;
  };
  throw new Error('An error has been raised');
};

const createUser = async (fullname, email, password) => {
  const SALT_ROUNDS = 10;
  // Find out if a user with the same email already exists.
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  };
  // Encrypt the password and create the user.
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await Users.create({ fullname, email, password: hashedPassword });
  return user;
};

const loginUser = async (email, password) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const userFounded = await Users.findOne({ email });
  if (userFounded) {
  const match = bcrypt.compareSync(password, userFounded.password);
    if (match) {
      const payload = {
        id: userFounded._id,
        email: userFounded.email,
        admin: userFounded.admin
      };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "10h",
      });
      return { token, payload };
    } else {
      throw { status: 404, message: "Please verify your credentials" };
    }
  } else {
    throw { status: 404, message: "No user match" };
  }
};

const updateUser = async (userId, userData) => {
  const SALT_ROUNDS = 10;
  const filter = {};

  if (userData.fullname !== undefined) {
    filter.fullname = userData.fullname;
  };

  if (userData.email !== undefined) {
    filter.email = userData.email;
  };

  if (userData.password !== undefined) {
    filter.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
  };

  if (userData.deleted !== undefined) {
    filter.deleted = userData.deleted;
  };

  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, filter, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserById,
  updateUser,
};