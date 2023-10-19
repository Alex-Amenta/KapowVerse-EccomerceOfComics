const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");

//Requerimos dotenv
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

//Obtenemos las variables del env
const { DB_INT, DB_USER, DB_PASSWORD, DB_HOST, DEV} = process.env;

let dbbase = DB_INT;
if (DEV && DEV === "development") {
	dbbase = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/comics`;
}

const sequelize = new Sequelize(dbbase, {
	logging: false,
	native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);

//extraemos los modelos
sequelize.models = Object.fromEntries(capsEntries);

// Relaciones

const { Comic, User, Cart, CartItem, Purchase, Orden } = sequelize.models;

// // Relación User - Purchase
// User.hasMany(Purchase);
// Purchase.belongsTo(User);

// // Relación Comic - Purchase
// Comic.hasMany(Purchase);
// Purchase.belongsTo(Comic);

// // Relación User - Cart
// User.hasOne(Cart);
// Cart.belongsTo(User);

// // Relación Cart - CartItem
// Cart.hasMany(CartItem);
// CartItem.belongsTo(Cart);

// Relación User - Purchase (Un usuario puede tener muchas compras)
User.hasMany(Purchase);
Purchase.belongsTo(User);

// Relación Purchase - Comic (Una compra puede incluir muchos cómics) a través de Orden con el campo 'quantity'
Comic.belongsToMany(Purchase, { through: Orden });
Purchase.belongsToMany(Comic, { through: Orden });
Comic.hasMany(Orden);
Orden.belongsTo(Comic);
Purchase.hasMany(Orden);
Orden.belongsTo(Purchase);

// Relación User - Cart (Un usuario puede tener un carrito)
User.hasOne(Cart);
Cart.belongsTo(User);

// Relación Cart - CartItem (Un carrito puede contener muchos elementos de carrito)
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);




module.exports = {
	...sequelize.models,
	conn: sequelize,
};
