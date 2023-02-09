const testProduct = (req, res) => {
    const { productName, description, quantityInStock, price, pics, sizes, categoriesIds, colours } = req.body;
    if (productName) {
        return res.status(200).json({ productName, description, quantityInStock, price, pics });
    } else {
        return res.status(404).json({ 'msg': 'You must provide information about the product to create it' });
    }
}

// Exports
module.exports = {
    testProduct
}