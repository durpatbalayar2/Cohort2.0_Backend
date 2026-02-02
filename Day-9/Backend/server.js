const app = require("./src/app");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./src/config/db");

dbConnect();
let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
