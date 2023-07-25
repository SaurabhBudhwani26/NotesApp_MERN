import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const {note} = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    
    <div className="card">
      <div className="card-header"></div>
      <div className="card-body">
        <h5 className="card-title">
        {note.title}
        </h5>
        <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2"></i>
      </div>
    </div>
  );
};

export default NoteItem;
