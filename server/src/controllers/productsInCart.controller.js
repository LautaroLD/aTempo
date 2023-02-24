const {Product,User,Cart,Color} = require('../database/models');

//* Añadir producto al carrito
const addToCart = async (req,res) => {
    const {idProduct, idCart} = req.query;
   
    console.log(idProduct);
    console.log(idCart);
    try {
        const product = await Product.findByPk(parseInt(idProduct));
        console.log(product);
        const cart = await Cart.findByPk(parseInt(idCart));
        console.log(cart);
        if (product.quantityInStock > 0) {
            const productAdd = await cart.addProducts(product);
            await cart.increment({ totalPrice: product.dataValues.price });
            res.status(200).json(productAdd);
          } else {
            res
                .status(200)
                .json({ message: "No puede agregarse al carrito, no hay stock." });
          }
    } catch (error) {
        res.status(200).json(error);
    }
}

//* Remover un producto del carrito
const remToCart = async (req,res) => { 
    const {idProduct, idCart} = req.query;
    try {
        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(idCart));
        await cart.decrement({ totalPrice: product.price });
        const productRem = await cart.removeProducts(product);
        res.status(200).json(productRem);
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Traer carrito con los productos
const getCart = async (req,res) => {
    const {idCart} = req.query;
    try {
        const cart = await Cart.findByPk(idCart, {
            include: {
                model: Product,
                include: ["ProductImgs", Color, "Size"],
            },
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Vaciar carrito
const deleteCart = async (req,res) => {
    const {idCart} = req.query;
    try {
        const cart = await Cart.findByPk(parseInt(idCart),{ include: Product });
        await cart.removeProducts(cart.dataValues.Products);
        await Cart.update({ totalPrice: 0 }, { where: { id: parseInt(idCart) } });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getCart, addToCart, remToCart, deleteCart }