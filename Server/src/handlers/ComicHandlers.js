const { getAllComicsByFilters, getAllComics } = require('../controllers/comic/getAllComic');
const { getComicByTitle } = require('../controllers/comic/getComicByTitle');
const { getComicsById } = require('../controllers/comic/getComicById');
const { createComic } = require('../controllers/comic/postComic');
const { toggleComicStatus } = require('../controllers/comic/toggleComicStatus');
const { updateComic } = require('../controllers/comic/updateComic');

const multer = require("multer");
const getComicsRelated = require('../controllers/comic/getComicsRelaeted');
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getAllComicsByFiltersHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 4;
        const category = req.query.category || null;
        const price = req.query.price || null;
        const stock = req.query.stock || null;
        const title = req.query.title || '';
        const sort = req.query.sort || null;
        const author = req.query.author || null;
        const active = req.query.active || null;

        const result = await getAllComicsByFilters(
            page,
            pageSize,
            category,
            price,
            stock,
            title,
            sort,
            author,
            active
        );

        if (!result) {
            let message = `No se han encontrado resultados`;

            if (category || price || sort || author || active) {
                message += ` para los filtros especificados`;
            }

            res.status(500).json({
                message,
            });
            return;
        }


        const { comics, totalItems, totalPages, currentPage } = result;

        if (page > totalPages) {
            res.status(404).json({
                message: `La página ${page} no existe`,
            });
            return;
        }

        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;

        res.status(200).json({
            comics,
            info: {
                totalItems,
                totalPages,
                currentPage,
                nextPage,
                previousPage,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllComicsHandler = async (req, res) => {
    const { title } = req.query;

    if (title) {
        try {
            const comic = await getComicByTitle(title);
            return res.status(200).json(comic);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    } else {
        try {
            const comics = await getAllComics();
            return res.status(200).json(comics);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

const getComicsByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getComicsById(id);
        response
            ? res.status(200).json(response)
            : res.status(404).json({ message: 'Cómic no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener un cómic' });
    }
};

const getComicsRelatedHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const comicRelated = await getComicsRelated(id);
        return res.status(200).json(comicRelated);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const postComicHandler = async (req, res) => {
    const { title, description, price, stock, category, author, publisher } = req.body;

    try {
        const imagenDataUri = `data:${req.files[0].mimetype
            };base64,${req.files[0].buffer.toString("base64")}`;
        const imagen = await cloudinary.uploader.upload(imagenDataUri, {
            folder: "KapowVerse",
        });

        const createdComic = await createComic(
            title,
            description,
            imagen.secure_url,
            price,
            stock,
            category,
            author,
            publisher,
        );
        return res.status(201).json(createdComic || {});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



const toggleComicHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await toggleComicStatus(id);
        if (response) {
            res.status(200).json({
                message: response.active ? 'Cómic reactivado exitosamente' : 'Cómic desactivado exitosamente'
            });
        } else {
            res.status(404).json({ message: 'Cómic no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado del cómic' });
    }
};


const updateComicHandler = async (req, res) => {
    const { id } = req.params;
    const updatedComicData = req.body;

    try {
        if (req.file) {
            const imagenDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const imagen = await cloudinary.uploader.upload(imagenDataUri, {
                folder: "KapowVerse",
            });
            updatedComicData.image = imagen.secure_url;
        } else if (!updatedComicData.image) {
            const existingComic = await getComicsById(id);
            updatedComicData.image = existingComic.image;
        }

        const updatedComic = await updateComic(id, updatedComicData);

        if (updatedComic) {
            return res.status(200).json({ message: 'Cómic actualizado exitosamente', updatedComic });
        } else {
            return res.status(404).json({ message: 'Cómic no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el cómic' });
    }
};


module.exports = {
    getAllComicsByFiltersHandler,
    getAllComicsHandler,
    getComicsByIdHandler,
    postComicHandler,
    toggleComicHandler,
    updateComicHandler,
    getComicsRelatedHandler
};