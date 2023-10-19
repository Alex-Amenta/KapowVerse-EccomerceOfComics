const server = require("./src/app.js");
const { conn } = require('./src/db.js');

const loadDB = require('./loadDB.js');

const PORT = process.env.PORT; 

conn.sync({ force: true }).then(async() => {
  await loadDB();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});