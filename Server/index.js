const server = require("./src/app.js");
const { conn } = require('./src/db.js');

const PORT = 3001;  //process.env.PORT

conn.sync({ force: true }).then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
});