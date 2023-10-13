const { getAllComicsByFilters, getAllComics } = require('../controllers/comic/getAllComic');
const { getComicByTitle } = require('../controllers/comic/getComicByTitle');
const { getComicsById } = require('../controllers/comic/getComicById');
const { createComic } = require('../controllers/comic/postComic');
const { deleteComic } = require('../controllers/comic/deleteComic')
const { updateComic } = require('../controllers/comic/updateComic')

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

const getAllComicsHandler = async(req,res) => {
    const { title } = req.query;
    
    if (title) {
        try {
            const comic = await getComicByTitle(title);
            return res.status(200).json(comic);
        } catch(error){
            return res.status(400).json({error: error.message});
        }
    } else{
        try {
            const comics = await getAllComics();
            return res.status(200).json(comics);
        } catch (error) {
            return res.status(400).json({error:error.message});
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

const cloudinary = require('../middleware/cloudinary');
const postComicHandler = async (req, res) => {
    const comicData = req.body;

    try {
        let imageUrl;

        if (req.file) {
            imageUrl = await uploadFileToCloudinary(req.file);
        } else if (comicData.image) {
            imageUrl = await uploadUrlToCloudinary(comicData.image);
        }

        comicData.image = imageUrl;

        const createdComic = await createComic(comicData);
        res.status(201).json({
            message: 'Cómic creado exitosamente',
            createdComic,
        });
    } catch (error) {
        if (error.message === 'Comic duplicado') {
            res.status(400).json({
                message: 'Cómic duplicado',
            });
        } else {
            res.status(500).json({ message: 'Error al crear cómic' });
        }
    }
};
  
const uploadFileToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });
};
  
  
const uploadUrlToCloudinary = (imageUrl) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageUrl, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};



const deleteComicHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteComic(id);
        response
            ? res.status(200).json({ message: 'Cómic eliminado exitosamente' })
            : res.status(404).json({ message: 'Cómic no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cómic' });
    }
};


const updateComicHandler = async (req, res) => {
    const { id } = req.params;
    const updatedComicData = req.body;

    try {
        if (req.file) {

            const imageUrl = await uploadFileToCloudinary(req.file);
            updatedComicData.image = imageUrl;
        } else if (!updatedComicData.image) {

            const existingComic = await getComicById(id);
            updatedComicData.image = existingComic.image;
        }

        const updatedComic = await updateComic(id, updatedComicData);

        if (updatedComic) {
            res.status(200).json({ message: 'Cómic actualizado exitosamente', updatedComic });
        } else {
            res.status(404).json({ message: 'Cómic no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cómic' });
    }
};



module.exports = { getAllComicsByFiltersHandler, getAllComicsHandler, getComicsByIdHandler, postComicHandler, deleteComicHandler, updateComicHandler };