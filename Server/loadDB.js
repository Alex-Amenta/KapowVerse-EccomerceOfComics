const { Comic, User, Category } = require('./src/db');
const data  = require('./data.json');

const loadDB = async () => {
    const transaction = await Comic.sequelize.transaction();



    try {
        // Load categories first
        for (const category of data.categories) {
            await Category.findOrCreate({
                where: { name: category.name },
                defaults: category,
                transaction,
            });
        }

        for (const comic of data.comics) {
            const { categories, ...comicData } = comic;
            const [comicInstance] = await Comic.findOrCreate({
                where: { id: comicData.id },
                defaults: comicData,
                transaction,
            });
        
            // Assuming you have a many-to-many relationship with a through table
            await comicInstance.setCategories(categories, { transaction });
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
