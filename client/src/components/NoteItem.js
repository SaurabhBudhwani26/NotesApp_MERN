import React from "react";

const NoteItem = (props) => {
  return (
    <div className="card">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <h5 className="card-title">
          {props.description} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Culpa quasi earum, exercitationem nam eum sequi ex
          suscipit doloremque repellendus saepe ut tenetur. Tempore veniam
          tenetur saepe ipsam corporis beatae blanditiis excepturi quos,
          asperiores autem?
        </h5>
        <p className="card-text"></p>
      </div>
    </div>
  );
};

export default NoteItem;
