

// Show all categories
const showAllCategories = async (req,res)=> {
    let categories = await Category.findAll(id);
    if(categories){
        return res.status(200).json({categories});
    } else {
        return res.status(404).json({'msg': 'no se encontro el artista '});
    }
}

// Exports
module.exports = {
    showAllCategories
}