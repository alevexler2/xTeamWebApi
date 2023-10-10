const Category = require('../models/categoryModel');

const getAllCategories = async (name) => {
  let query = {};
  if (name && name.trim() !== '' && name !== undefined) {
    query.name = name;
  }
  const categories = await Category.find(query);
  if (categories) {
    return categories;
  }
  throw new Error('Se ha producido un error');
};

const createCategory = async (name) => {
  // Find out if a category with the same name already exists.
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    throw new Error('Category already exists');
  };
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  getAllCategories,
  createCategory,
};
