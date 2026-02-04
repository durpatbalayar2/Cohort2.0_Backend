import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  // React needs to know whether we are editing an existing note
  // or creating a new one, so we store the note id in editId.
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      const res = await axios.put(
        `https://cohort2-0-backend-p05k.onrender.com/api/notes/${editId}`,
        {
          title,
          description,
        },
      );

      setNotes(
        notes.map((note) =>
          note._id === editId ? { ...note, title, description } : note,
        ),
      );
       toast.success("Note edited successfully!");

      setEditId(null);
    } else {
      const res = await axios.post(
        "https://cohort2-0-backend-p05k.onrender.com/api/notes",
        {
          title,
          description,
        },
      );

      setNotes([...notes, res.data.note]);
      toast.success("Note created successfully!");

    }

    setTitle("");
    setDescription("");
  }

  async function fetchNotes() {
    try {
      const response = await axios.get(
        "https://cohort2-0-backend-p05k.onrender.com/api/notes",
      );

      // console.log(response.data.notes)

      setNotes(response.data.notes);
    } catch (error) {
      console.log("Error at fetching notes");
    }
  }

  async function handleDeleteNote(noteId) {
    try {
      await axios.delete(
        `https://cohort2-0-backend-p05k.onrender.com/api/notes/${noteId}`,
      );

      setNotes(notes.filter((note) => note._id !== noteId));
       toast.success("Note deleted successfully!");
    } catch (error) {
      console.log("Error while deleting note", error);
    }
  }

  function handleNoteUpdate(elem) {
    console.log(elem);
    setTitle(elem.title);
    setDescription(elem.description);
    setEditId(elem._id);
  }

  // For handling multiple re-render during state variable change we are using useEffect

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <Toaster position="top-right" />
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Enter the title"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Write the description"
        />
        <button type="submit"> {editId ? "Update Note" : "Submit"}</button>
      </form>

      <div className="notes">
        {notes.map(function (elem, idx) {
          return (
            <div key={idx} className="note">
              <h1>{elem.title}</h1>
              <p>{elem.description}</p>

              <div className="btns">
                <button
                  onClick={() => handleDeleteNote(elem._id)}
                  className="delete"
                >
                  Delete
                </button>
                <button onClick={() => handleNoteUpdate(elem)} className="edit">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
