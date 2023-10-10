const categoryService = require('../services/category.service');

const getAllCategories = async (req, res) => {
  try {
    const { name } = req.query
    const categories = await categoryService.getAllCategories(name);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to get categories' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.createCategory(name);
    res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Unable to create categories' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
