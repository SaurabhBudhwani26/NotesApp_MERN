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

    const note = {
      _id: "764bf9b1b1c3f86231a9a32dbd",
      user: "64ad5148c6e014de4e4f6768",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-25T09:51:23.917Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Deleteing a note
  const deleteNote = (id) => {
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Editing a note
  const editNote = async (id, title, description, tag) => {
    let url = `${host}/notes/updatenote/${id}`;
    for (let i =0; i<notes.length; i++){
      const element = notes[i];

      if(element._id ===  id){
        element.title = title
        element.description = description
        element.tag = tag
      }
    }

    const response = await fetch(url, {
      method: "POST",
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
