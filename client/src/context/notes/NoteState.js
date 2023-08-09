import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);


  //Getting all the notes
  const getNotes = async() => {
    let url = `${host}/notes/fetchnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZDUxNDhjNmUwMTRkZTRlNGY2NzY4In0sImlhdCI6MTY4OTE2MTQxN30.oX-YZDH7wQVOMp8u385EQTohC5sascs5F56AeX6-C1w",
      }
    
    });

    const data = await response.json()
    setNotes(data)
  }


  //Adding a note
  const addNote = async (title, description, tag) => {
    let url = `${host}/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZDUxNDhjNmUwMTRkZTRlNGY2NzY4In0sImlhdCI6MTY4OTE2MTQxN30.oX-YZDH7wQVOMp8u385EQTohC5sascs5F56AeX6-C1w",
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note = await response.json()
    setNotes(notes.concat(note));  
  };

  //Deleteing a note
  const deleteNote = async (id) => {
    let url = `${host}/notes/deletenote/${id}`;
    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZDUxNDhjNmUwMTRkZTRlNGY2NzY4In0sImlhdCI6MTY4OTE2MTQxN30.oX-YZDH7wQVOMp8u385EQTohC5sascs5F56AeX6-C1w",
      }
    });

    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Editing a note
  const editNote = async (id, title, description, tag) => {
    let url = `${host}/notes/updatenote/${id}`;
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let i =0; i<newNotes.length; i++){
      const element = newNotes[i];

      if(element._id ===  id){
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
      
    }
    setNotes(newNotes)

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZDUxNDhjNmUwMTRkZTRlNGY2NzY4In0sImlhdCI6MTY4OTE2MTQxN30.oX-YZDH7wQVOMp8u385EQTohC5sascs5F56AeX6-C1w",
      },
      body: JSON.stringify({title, description, tag}),
    });



  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
