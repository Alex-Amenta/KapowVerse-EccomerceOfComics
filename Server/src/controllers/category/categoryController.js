const { Category } = require('../../db');

// getAll, postOne, deleteOne, getOne

const getAll = async () => {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        throw error;
    }
};

const postOne = async (category) => {
    try {
        const newCategory = await Category.create(category);
        return newCategory;
    } catch (error) {
        throw error;
    }
};

const deleteOne = async (id) => {
    try {
        const result = await Category.destroy({
            where: {
                id,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};

const getOne = async (criteria) => {
    try {
        const category = await Category.findOne({
            where: criteria
        });
        return category;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAll,
    postOne,
    deleteOne,
    getOne,
};