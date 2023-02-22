const { Product, Size, Category, Color, Brand, ShoeLast } = require("../database/models");

const productList = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [["name", "asc"]],
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" },
                { association: "Brand" },
                { association: "Last" },
            ]
        })
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const productDetail = async (req, res) => {
    try {
        const idP = req.params.id;
        const product = await Product.findOne({
            where: { id: idP },
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" },
                { association: "Brand" },
                { association: "Last" },
            ]
        });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

const saveProduct = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            quantityInStock, 
            price, 
            pics, 
            sizes, 
            categoriesIds, 
            colours, 
            brandId,
            last
        } = req.body;

        let picsUrls = []

        pics.forEach((url) => {
            picsUrls.push({ status: "active", imgUrl: url })
        });

        const newProduct = await Product.create({
            name,
            description,
            quantityInStock,
            price,
            ProductImgs: picsUrls,
        }, {
            include: [
                { association: "ProductImgs" },
            ]
        });

        const size = await Size.findAll({
            where: {
                id: sizes
            }
        });
        const categories = await Category.findAll({
            where: {
                id: categoriesIds
            }
        });
        const coloursResult = await Color.findAll({
            where: {
                id: colours
            }
        });

        const shoeLastResult = await ShoeLast.findAll({
            where: {
                id: last
            }
        });

        const brand = await Brand.findOne({
            where: {
                id: brandId
            }
        });
        
        const prodSized = await newProduct.addSize(size)

        const prodCat = await newProduct.addCategories(categories)

        const prodCol = await newProduct.addColours(coloursResult)

        const prodLast = await newProduct.addShoeLasts(shoeLastResult)

        await newProduct.update(
            { BrandId: brand.dataValues.id },
            { where: {
                    id: newProduct.dataValues.id
                }
            }
        )

        res.status(201).json({ 
            message: "New Product created", 
            newProduct, 
            prodSized, 
            prodCat, 
            prodCol, 
            prodLast           
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const productToUpdate = await Product.findByPk(productId, {});

        if (productToUpdate !== null) {
            await productToUpdate.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantityInStock: req.body.quantityInStock
            });
            return res.status(200).json(productToUpdate)
        }

    } catch (error) {
        res.status(400).json({ errorMessage: "Product could't be saved" })
    }
};

const deleteProduct = async (req, res) => {
    
    const id = req.params.id;

    try {

        const prodToDelete = await Product.destroy({
            where: { id: id }
        });

        if (prodToDelete === 0) {
            throw new Error(`Product ID ${id} not found in database`)
        }

        return res.status(200).json({success: `Product ID ${id} just deleted successfully`})

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

module.exports = {
    productList,
    productDetail,
    saveProduct,
    updateProduct,
    deleteProduct
}