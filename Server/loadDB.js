const { Comic, User } = require('./src/db');
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

    try {
        await User.create({ name: "admin", email: "admin@admin.com", password: "password", role: 'admin', image: "https://cdn1.iconfinder.com/data/icons/user-avatar-2/64/User-circle-check-512.png", active: true });
    } catch (error) {
        console.error('Error al crear el usuario admin:', error);
        throw error;
    }
};

module.exports = loadDB;
