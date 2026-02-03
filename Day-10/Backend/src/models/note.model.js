const mongoose = require("mongoose");

// Create noteSchema

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Create noteModel

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
