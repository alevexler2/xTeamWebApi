const gameService = require('../services/game.service');

const getAllGames = async (req, res) => {
  try {
    const { category, title } = req.query;
    const games = await gameService.getAllGames(category, title);
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to get games' });
  }
};

const createGame = async (req, res) => {
try {
  const { images, title, details, price, category } = req.body;
  const newGame = await gameService.createGame(images, title, details, price, category);
  res.status(200).json(newGame);
} catch (error) {
  console.error(error);
  res.status(404).json({ message: 'Unable to create game' });
}
};

module.exports = {
  getAllGames,
  createGame,
};
