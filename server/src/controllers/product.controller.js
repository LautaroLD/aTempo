const { Product } = require("../database/models");

// List of every product in db
const productList = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [["name", "asc"]],
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" }
            ]
        })
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// brings one product based in his id/UUID
const productDetail = async (req, res) => {
    try {
        const idP = req.params.id;
        const product = await Product.findOne({
            where: { id: idP },
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" }
            ]
        });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

module.exports = {
    productList,
    productDetail
}