// Server ko run krna
// DB se connect krna

const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const dbConnect = require("./src/config/database");

dbConnect();
app.listen(3000, () => {
  console.log("Server is running at 3000");
});
