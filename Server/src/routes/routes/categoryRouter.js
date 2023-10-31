const { Router } = require('express');
const { getAllCategoriesHandler, postCategoryHandler, deleteCategoryHandler } = require('../../handlers/CategoryHandler');

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesHandler);
categoryRouter.post('/', postCategoryHandler);
categoryRouter.delete('/:id', deleteCategoryHandler);
//TODO ruta para editar una categoria





module.exports = categoryRouter;
