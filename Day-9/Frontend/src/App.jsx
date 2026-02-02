import React, { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  async function getNotes() {
    const res = await axios.get("http://localhost:3000/api/notes");

    setNotes(res.data.notes);

    // console.log(res.data.notes)
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes">
     
        {notes.map(function (elem, idx) {
          return  <div key={idx}> {elem.title},{elem.description} </div>
        })}
      
    </div>
  );
}

export default App;
