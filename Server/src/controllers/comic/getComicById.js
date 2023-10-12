const { Comic, Purchase } = require('../../db');


const getComicsById = async (id) => {
    try {
        const comic = await Comic.findByPk(id, {
            include: [
                {
                    model: Purchase,
                    attributes: ['id', 'comicId', 'userId'],
                }
            ],
        });
        return comic;
    } catch (error) {
        console.log(error);
    }
};


module.exports= {getComicsById};