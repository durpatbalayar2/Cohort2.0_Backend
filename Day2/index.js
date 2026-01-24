const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.send("This is Home Route");
});

// About Route

app.get("/about", (req, res) => {
  res.send("This is About Route");
});

let PORT = 3000; // Server port

//Server start and listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
