const server = require("./src/app.js");
const { conn } = require('./src/db.js');

const PORT = process.env.PORT; // 3001; 

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log(`Server listening on port ${3001}`);
  });
});