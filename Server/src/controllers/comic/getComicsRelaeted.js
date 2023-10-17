const { Op } = require('sequelize');
const { Comic } = require('../../db');

const getComicsRelated = async (id) => {
    const currentComic = await Comic.findByPk(id);

      if (!currentComic) {
        return res.status(404).json({ error: 'Cómic no encontrado' });
      }

      const category = currentComic.category;

      const relatedComics = await Comic.findAll({
        where: {
          category: category,
          id: {
            [Op.not]: id, // Excluye el cómic actual
          },
        },
        limit: 6,
      });

      return relatedComics;
};

module.exports = getComicsRelated;