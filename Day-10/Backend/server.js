const app = require("./src/app");

const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./src/config/database");
dbConnect();



app.listen(3000, () => {
  console.log("Server is running at port on 3000");
});

