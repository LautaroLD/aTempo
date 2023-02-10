const Router = require('express');
const routerCategories = Router();

const { showAllCategories } = require('../controllers/categories.controller');

routerCategories.get('/', showAllCategories);

module.exports = routerCategories;