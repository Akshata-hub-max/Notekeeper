import React, { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import NotePopup from "./components/NotePopup";
import { addNote, updateNote, deleteNote, togglePin } from "./components/noteOperations"; 
import { db } from "./services/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pinMessage, setPinMessage] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const pageSize = 6; 
  const sortNotes = (notes) => {
    return notes.sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.timestamp) - new Date(a.timestamp); 
      }
      return b.pinned - a.pinned; 
    });
  };


  
  const currentNotes = notes.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(sortNotes(fetchedNotes));
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };
    fetchNotes();
  }, []);

 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  
  const openPopup = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
  };


  
  const closePopup = () => {
    setSelectedNote(null);
    setIsPopupOpen(false);
  };


  
  return (
    <div className="app">
      <header className="header-container">
        <h1 className="header-title">
          Interactive Notekeeper
        </h1>

        <div className="pagination-container">
          <button className="pagination-btn" id="previous-btn" disabled={currentPage === 1}>
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: Math.ceil(notes.length / pageSize) }, (_, index) => (
              <button
                key={index + 1}
                className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="pagination-btn"
            id="next-btn"
            disabled={currentPage === Math.ceil(notes.length / pageSize)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <button
          onClick={() =>
            addNote({ title: "Untitled Note", pinned: false }, setNotes)
          }
          className="add-note-btn"
        >
          + Add Note
        </button>
      </header>

    
      <div className="notes-grid">
        {currentNotes.map((note) => (
          <NoteCard key={note.id} note={note} onClick={() => openPopup(note)} />
        ))}
      </div>

      {isPopupOpen && (
        <NotePopup
          note={selectedNote}
          onClose={closePopup}
          onSave={async (updatedNote) => {
            await updateNote(selectedNote.id, updatedNote, notes, setNotes);
            closePopup(); 
          }}
          onDelete={() => {
            deleteNote(selectedNote.id, notes, setNotes);
            closePopup();
          }}
          onPinToggle={() => togglePin(selectedNote.id, notes, setNotes, setPinMessage)}
        />
      )}

      {pinMessage && <div className="pin-message">{pinMessage}</div>}
    </div>
  );
};

export default App;
