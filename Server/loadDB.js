const { Comic, User, Category, Purchase } = require('./src/db');
const data  = require('./data.json');

const loadDB = async () => {
    const transaction = await Comic.sequelize.transaction();
    const userTransaction = await User.sequelize.transaction();
    const purchaseTransaction = await Purchase.sequelize.transaction();

    // comics y categorias.
    try {
        // Load categories first
        for (const category of data.categories) {
            await Category.findOrCreate({
                where: { name: category.name },
                defaults: category,
                transaction,
            });
        }

        // Load comics
        for (const comic of data.comics) {
            const { categories, ...comicData } = comic;
            const [comicInstance] = await Comic.findOrCreate({
                where: { id: comicData.id },
                defaults: comicData,
                transaction,
            });
        
            // Load categories for each comic
            await comicInstance.setCategories(categories, { transaction });
        }
        await transaction.commit();
        console.log('Datos cargados con éxito en la base de datos.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al cargar datos en la base de datos:', error);
        throw error;
    }

    // user
    try {
        for (const usuario of data.user) {
            await User.findOrCreate({
                where: { email: usuario.email },
                defaults: usuario,
                userTransaction,
            });
        }
        await userTransaction.commit();
    } catch (error) {
        await userTransaction.rollback();
        console.error('Error al crear los usuarios:', error);
        throw error;
    }

    // purchase
    try {
        for (const purchase of data.purchases) {
            const { userId, comicId } = purchase;
            const purchaseInstance = await Purchase.create(purchase, {
                transaction: purchaseTransaction,
            });

            const userInstance = await User.findByPk(userId, {
                transaction: purchaseTransaction,
            });
            const comicInstance = await Comic.findByPk(comicId, {
                transaction: purchaseTransaction,
            });

            await purchaseInstance.setUser(userInstance, {
                transaction: purchaseTransaction,
            });
            await purchaseInstance.setComic(comicInstance, {
                transaction: purchaseTransaction,
            });
        }
        await purchaseTransaction.commit();
    } catch (error) {
        await purchaseTransaction.rollback();
        console.error('Error al crear purchase:', error);
        throw error;
    }
};

module.exports = loadDB;
