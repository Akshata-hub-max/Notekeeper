import React from "react";
import "./NoteCard.css";

const NoteCard = ({ note, onClick }) => {
  return (
    <div
      className="note-card"
      onClick={onClick}
      style={{
        borderLeft: note.pinned ? "5px solid darkgreen" : "none", 
      }}
    >
      <h3 className="note-title">{note.title}</h3>
      <p className="note-tagline">{note.tagline}</p>
      <p className="note-body">{note.body}</p>
    </div>
  );
};

export default NoteCard;
