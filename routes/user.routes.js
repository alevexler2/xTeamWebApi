const Router = require('express');
const { jwtValidator } = require("../middlewares/jwtValidator");

const { 
  getAllUsers, 
  getUserById , 
  createUser,
  updateUser,
  loginUser,
} = require('../controller/user.controller');
const route = Router();

route.get('/', jwtValidator, getAllUsers);
route.get('/:userId', jwtValidator, getUserById);
route.post('/', createUser);
route.post("/login", loginUser);
route.put('/:userId', updateUser);

module.exports = route;