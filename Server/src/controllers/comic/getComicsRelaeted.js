const { Op } = require('sequelize');
const { Comic, Category } = require('../../db');

const getComicsRelated = async (id) => {
    const currentComic = await Comic.findByPk(id, {
      include: Category // Incluye las categorías relacionadas con el cómic
  });

      if (!currentComic) {
        throw new Error( 'Comic not found' );
      }

      const categoryIds = currentComic.categories.map(cat => cat.id);

      const relatedComics = await Comic.findAll({
        include: {
            model: Category,
            where: {
                id: categoryIds
            }
        },
        where: {
            id: {
                [Op.not]: id, // Excluye el cómic actual
            }
        },
        limit: 6
    });

      return relatedComics;
};

module.exports = getComicsRelated;