import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home() {
  return (
    <div className="container">
      <AddNote />
      <h1 className="my-3">Your notes</h1>
      <Notes />
    </div>
  );
}
