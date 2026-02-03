const app = require("./src/app");

const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./src/config/database");
dbConnect();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
