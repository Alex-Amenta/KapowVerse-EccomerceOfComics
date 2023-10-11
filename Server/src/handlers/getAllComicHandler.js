const { getAllComics } = require('../controllers/comic/getAllComic');

const getAllComicsHandler = async (req, res) => {
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

        const result = await getAllComics(
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

            // Verificar si los filtros, excepto title y page, están vacíos
            if (category || price || sort || author || active) {
                message += ` para los filtros especificados`;
            }

            res.status(204).json({
                message,
            });
            return;
        }

        const { comics, totalItems, totalPages, currentPage } = result;

        // Verificar si la página solicitada está fuera de rango
        if (page > totalPages) {
            res.status(204).json({
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

module.exports = { getAllComicsHandler };