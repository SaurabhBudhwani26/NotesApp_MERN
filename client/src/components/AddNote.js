import { useContext,useState } from "react"
import React from 'react'
import noteContext from "../context/notes/noteContext"


const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "Default"
    })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        document.getElementById("title").value = ''
        document.getElementById("description").value = '' 
        document.getElementById("tag").value = '' 
        props.showAlert('Added Successfully','success')

      
    }

    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value})
    }
    
    
  return (
    <div className="container">
      <h1 className="my-3">Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            Enter title of your notes here
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >
            Description
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={handleChange}
            minLength={5} required
          />
          </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
      </div>
  )
}

export default AddNote
