import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";
import NoteCard from "../components/NoteCard";
import NotePopup from "../components/NotePopup";
import Pagination from "../components/Pagination";

const Home = () => {
  const { notes, addNote, updateNote, deleteNote } = useContext(NotesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupNote, setPopupNote] = useState(null);
  const notesPerPage = 6;


  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  const currentNotes = sortedNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );


  
  const handleSaveNote = (note) => {
    if (note.id) {
      updateNote(note.id, note);
    } else {
      addNote({ ...note, pinned: false });
    }
    setPopupNote(null);
  };



  return (
    <div className="home">
      <button onClick={() => setPopupNote({})}>Add Note</button>
      <div className="notes-grid">
        {currentNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={setPopupNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(notes.length / notesPerPage)}
        onPageChange={setCurrentPage}
      />
      {popupNote && (
        <NotePopup
          note={popupNote}
          onClose={() => setPopupNote(null)}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
};

export default Home;
