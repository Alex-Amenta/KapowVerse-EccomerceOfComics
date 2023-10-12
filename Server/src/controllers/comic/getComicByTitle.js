const { Comic } = require('../../db');
const { Op } = require('sequelize');

const getComicByTitle = async (title) => {
  const data = await Comic.findAll({
    where: { title: { [Op.iLike]: `%${title}%` } },
  });
  if (data.length === 0)
    throw new Error(`No se encontró el comic con el título: ${title}.`);

  return [...data];
};

module.exports = {getComicByTitle};
