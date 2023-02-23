const Router = require('express');
const routerCategories = Router();

const { showAllCategories,
    showCategoryById,
    createCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categories.controller');

routerCategories.get('/', showAllCategories);
routerCategories.get('/:id',showCategoryById);
routerCategories.post('/', createCategory);
routerCategories.put('/:id', updateCategory);
routerCategories.delete('/:id', deleteCategory);

module.exports = routerCategories;