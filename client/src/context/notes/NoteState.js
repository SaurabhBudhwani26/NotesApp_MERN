import React, {useState} from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
 
  const notesInitial = [
    {
      "_id": "64bf9b0cc3f86231a9a32db7",
      "user": "64ad5148c6e014de4e4f6768",
      "title": "My title",
      "description": "This is the description",
      "tag": "My Tag",
      "date": "2023-07-25T09:51:08.520Z",
      "__v": 0
    },
    {
      "_id": "64bf9b12c3f86231a9a32db9",
      "user": "64ad5148c6e014de4e4f6768",
      "title": "My title",
      "description": "This isfgwkmg the description",
      "tag": "My Tag",
      "date": "2023-07-25T09:51:14.126Z",
      "__v": 0
    },
    {
      "_id": "64bf9b17c3f86231a9a32dbb",
      "user": "64ad5148c6e014de4e4f6768",
      "title": "My title 3",
      "description": "This isfgwkmg the description",
      "tag": "My Tag",
      "date": "2023-07-25T09:51:19.995Z",
      "__v": 0
    },
    {
      "_id": "64bf9b1bc3f86231a9a32dbd",
      "user": "64ad5148c6e014de4e4f6768",
      "title": "My title 4",
      "description": "This isfgwkmg the description",
      "tag": "My Tag",
      "date": "2023-07-25T09:51:23.917Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

    
    
  return(
    <noteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;

