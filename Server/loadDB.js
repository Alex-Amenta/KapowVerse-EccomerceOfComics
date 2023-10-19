const { Comic } = require('./src/db');
const comics = require('./data.json');

const loadDB = async () => {
    const transaction = await Comic.sequelize.transaction();
    
    try {
        for (const comic of comics) {
            await Comic.findOrCreate({
                where: { id: comic.id },
                defaults: comic,
                transaction,
            });
        }

        await transaction.commit();
        console.log('Datos cargados con éxito en la base de datos.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al cargar datos en la base de datos:', error);
        throw error;
    }
};

module.exports = loadDB;
