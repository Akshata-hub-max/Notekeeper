import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"; 
import "./NotePopup.css";

const NotePopup = ({ note, onClose, onSave, onDelete, onPinToggle }) => {
  const [title, setTitle] = useState(note.title);
  const [tagline, setTagline] = useState(note.tagline);
  const [body, setBody] = useState(note.body);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: false,
    tagline: false,
    body: false,
  });



  const handleSave = () => {
    let isValid = true;
    let emptyFields = [];
  
    // Validate input fields
    const updatedFormErrors = {
      title: !title,
      tagline: !tagline,
      body: !body,
    };
  
    setFormErrors(updatedFormErrors);
  
    if (updatedFormErrors.title) emptyFields.push("Title");
    if (updatedFormErrors.tagline) emptyFields.push("Tagline");
    if (updatedFormErrors.body) emptyFields.push("Description");
  
    if (emptyFields.length > 0) {
      setErrorMessage("All fields (Title, Tagline, and Description) are required.");
      alert(`Please fill in the following field(s): ${emptyFields.join(", ")}`);
      isValid = false;
    } else {
      setErrorMessage("");
    }
  
    if (isValid) {
      const updatedNote = {
        ...note,
        title,
        tagline,
        body,
        pinned: note.pinned, 
      };
      onSave(updatedNote); 
    }
  };



  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note.id); 
      onClose(); 
    }
  };


  
  const handlePin = () => {
    const updatedNote = { ...note, pinned: !note.pinned }; 
    onSave(updatedNote); 
  };

  return (
    <div className="note-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <input
          type="text"
          className="popup-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter note title"
        />
        <input
          type="text"
          className="popup-tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)} 
          placeholder="Enter tagline"
        />
        <textarea
          className="popup-body"
          value={body}
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Write your note here..."
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="popup-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button
            className={`pin-btn ${note.pinned ? "pinned" : ""}`}
            onClick={handlePin}
            style={{
              color: note.pinned ? "gold" : "gray", 
            }}
          >
            <FontAwesomeIcon icon={faThumbtack} />
            {note.pinned ? "Pinned" : "Pin"}
          </button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;
