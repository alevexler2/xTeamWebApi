const Router = require('express');
const { jwtValidator } = require("../middlewares/jwtValidator");
const { 
  getAllGames,
  createGame,
} = require('../controller/game.controller');

const route = Router();

route.get('/', getAllGames);
route.post('/',  createGame);

module.exports = route;