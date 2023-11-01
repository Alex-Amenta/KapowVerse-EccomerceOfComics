const  { getAll, postOne, deleteOne, getOne}  = require('../controllers/category/categoryController');


const getAllCategoriesHandler = async (req, res) => {
    try {
        const categories = await getAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postCategoryHandler = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required.' });
    }

    try {
        const existingCategory = await getOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists.' });
        }

        const newCategory = await postOne({ name });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Id is required.' });
        }
        const existingCategory = await getOne({id});
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        const result = await deleteOne(id);
        if (!result) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategoriesHandler,
    postCategoryHandler,
    deleteCategoryHandler,
};