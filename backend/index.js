const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const db_connection = require("./src/db/db.js");

const PORT = process.env.PORT;

db_connection()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server runs on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in connection mongobd: ", err);
  });
