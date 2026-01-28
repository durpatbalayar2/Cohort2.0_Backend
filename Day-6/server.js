// Server run krna
// Server ko database se connect krna
const app = require("./src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let mongodbURl = process.env.MONGODB_URL;

function dbConnect() {
  mongoose.connect(mongodbURl).then(() => {
    console.log("connected to database");
  });
}
dbConnect()

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
