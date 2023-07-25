import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";


const Notes = () => {
    const context = useContext(noteContext)
    const {notes, setNotes } = context;
    
  return (
    <div>
        {notes.map((note)=>{
        return (
          <div className="container my-3">
            <NoteItem title = {note.title}  description={note.description}/>
          </div>
        )
      })}
      
    </div>
  )
}

export default Notes
