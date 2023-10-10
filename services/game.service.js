const Games = require('../models/gamesModels');

const getAllGames = async (categoryId, title) => {
  let query = {};
  if (categoryId) {
    query.category = categoryId;
  }
  if (title) {
     query.title = { $regex: title, $options: 'i' };
  }
  const games = await Games.find(query).populate('category');
  if(games) {
    return games
  }
  throw new Error('An error has been raised');
};

const createGame = async (images, title, details, price, category) => {
  // Find out if a game with the same title already exists.
  const existingexistingGame = await Games.findOne({ title });
  if (existingexistingGame) {
    throw new Error('Game already exists');
  };
  const newGame = await Games.create({ images, title, details, price, category });
  return newGame;
};

module.exports = {
  getAllGames,
  createGame,
};
