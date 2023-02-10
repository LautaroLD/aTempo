const Router = require('express');
const { testProduct } = require("../controllers/product.controller")
const { checkMultipart, handleUploadFirebase } = require("../middlewares/upload.middleware")

const routerProduct = Router()

routerProduct.post('/create', checkMultipart, handleUploadFirebase, testProduct);

module.exports = routerProduct;