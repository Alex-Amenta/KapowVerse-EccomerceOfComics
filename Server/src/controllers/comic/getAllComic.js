const { Comic, Purchase } = require('../../db');
// const comics = require('../../../data.json');
const Op = require('sequelize');

// const saveComicsToDatabase = async() => {
//     try{
//         for(const comic of comics) {
//             await Comic.findOrCreate({
//                 where: { id: comic.id},
//                 defaults: comic,
//             });
//         }

//     } catch(error) {
//         console.log(error);
//         throw error;
//     }
// };

const getAllComicsByFilters = async(page, pageSize, title, price, category, author, stock, sort, publish, active) => {
    try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        let whereCondition = {};

        if (category) {
            whereCondition.category = category;
        }
        if (publish) {
            whereCondition.publish = publish;
        }

        if (stock) {
            whereCondition.stock = {
                [Op.gt]: 0,
            };
        }
    
        if (title) {
            whereCondition.title = {
                [Op.iLike]: `%${title}%`,
            };
        }

        if (author) {
            whereCondition.author = {
                [Op.iLike]: `%${author}%`,
            };
        }

        // if (active !== null) {
        //     whereCondition.active = active;
        // }

        let order = [];

        if (price === 'asc') {
            order.push(['price', 'ASC']);
        } else if (price === 'desc') {
            order.push(['price', 'DESC']);
        }

        if (sort === 'asc') {
            order.push(['title', 'ASC']);
        } else if (sort === 'desc') {
            order.push(['title', 'DESC']);
        }

        const savedComics = await Comic.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order,
            distinct: true,
            include: [
                {
                    model: Purchase,
                    attributes: ['id', 'comicId', 'userId'],
                },
            ],
        });

        const totalItems = savedComics.count;
        const totalPages = Math.ceil(totalItems / pageSize);

        if (totalItems === 0) {
            await saveComicsToDatabase();
            return await getAllComicsByFilters(page, pageSize, title, price, category, author, stock, sort,publish, active);
        }

        return {
            comics: savedComics.rows,
            totalItems,
            totalPages,
            currentPage: page,
        };


    } catch (error) {
        throw error;
    }
};

const getAllComics = async () => {
    // await saveComicsToDatabase();
    const comic = await Comic.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'price',
            'category',
            'author',
            'image',
            'stock',
            'publisher',
            'active',
        ],
    });
    if (comic.length === 0) throw new Error('No hay comics para mostrar');
    return comic;
};

module.exports = { getAllComicsByFilters, getAllComics }