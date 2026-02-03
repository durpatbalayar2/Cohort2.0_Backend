const express = require("express");
const noteModel = require("./models/note.model");

const cors = require("cors");
const path = require("path")

const app = express();

app.use(cors());
app.use(express.static("./public"))
app.use(express.json());

// Create note -POST

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });
  console.log(note);

  res.status(201).json({ message: "Note created successfully", note });
});

// Fetch all notes - GET

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({ message: "Note fetched successfully", notes });
  } catch (error) {
    (res.status(500),
      json({ message: "Internal Server Error while fetching notes", error }));
  }
});

// Delete notes - DELETE

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  res.status(204).send();
});

// Update notes

app.put("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    await noteModel.findByIdAndUpdate(id, { title, description });

    res.status(200).json({ message: "Note modified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while updating notes", error });
  }
});

// Wild card api
// Mostly Used when anybody try to fetch wrong path

//Bring folder path url from root where our existence file located
// console.log(__dirname)

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app;
