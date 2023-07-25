import React, {useContext, useEffect} from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";


const Notes = () => {
    const context = useContext(noteContext)
    const {notes, getNotes} = context;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getNotes()}, [])


  return (
    <div>
        {notes.map((note) => {
        return (
          <div className="container my-3">
            <NoteItem key={note._id} note={note} />
          </div>
        )
      })}
      
    </div>
  )
}

export default Notes
