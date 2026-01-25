//Server create karna
//Server ko config karne

const express = require("express");

const app = express();

app.use(express.json()); // received note ko read karne mein use hota hai

const notes = []; // Empty array note

// Create a new note
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("Note created!");
  console.log(notes);
});

// retrive a created note (read note)

app.get("/notes", (req, res) => {
  res.send(notes);
});

// Delete the note
app.delete("/notes/:index", (req, res) => {
  //   console.log(req.params.index);

  delete notes[req.params.index];
  res.send("Note deleted successfully");
});

//Update the description from notes -> PATCH

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index; // get the index to whom desc should be modified
  notes[index].description = req.body.description;
  res.send("Successfully description is modified");
});

// Update all entire resource
app.put("/notes/:index", (req, res) => {
  const idx = req.params.index;
  notes[idx] = {
    title: req.body.title,
    description: req.body.description,
  };
  res.send("Successfully updated")
});

module.exports = app;
