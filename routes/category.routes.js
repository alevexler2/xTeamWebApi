const Router = require('express');
const { jwtValidator } = require("../middlewares/jwtValidator");
const { 
  getAllCategories,
  createCategory,
} = require('../controller/category.controller');

const route = Router();

route.get('/', getAllCategories);
route.post('/', jwtValidator, createCategory);

module.exports = route;