require("dotenv").config();
const app = require("./src/app");
const dbConnect = require("./src/config/db");

dbConnect();

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});
