// Server ko create krn
// Server ko config karna

const express = require("express");

const app = express();

app.use(express.json());

const notes = []; //  Empty notes

// Note created

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.status(201).json({ message: "Note created successfully!" });
});

// Retrive the created note

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Note fetched successfully!", notes: notes });
});

// Delete the note

app.delete("/notes/:index", (req, res) => {
  const idx = req.params.index;

  delete notes[idx];
  res.status(204).json({ message: "Note deleted successfully" });
});

//Modify the description

app.patch("/notes/:index", (req, res) => {
  const idx = req.params.index;

  notes[idx].description = req.body.description;

  res.status(200).json({ message: "Note description update successfully" });
});

module.exports = app;
