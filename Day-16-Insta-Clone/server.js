require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

app.listen(3000, () => {
  connectDB();
  console.log("Server is running at 3000 port");
});
