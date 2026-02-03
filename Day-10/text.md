 async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      const res = await axios.put(`http://localhost:3000/api/notes/${editId}`, {
        title,
        description,
      });

     setNotes(
       notes.map((note) =>
         note._id === editId ? { ...note, title, description } : note,
       ),
     );

      setEditId(null);
    } else {
      const res = await axios.post("http://localhost:3000/api/notes", {
        title,
        description,
      });

      setNotes([...notes, res.data.note]);
    }

    setTitle("");
    setDescription("");
  }