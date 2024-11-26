import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase"; 

// Function to add a new note to Firestore
export const addNote = async (note, setNotes) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      ...note,
      timestamp: new Date(),
    });

    setNotes((prevNotes) => {
      const updatedNotes = [
        ...prevNotes,
        { id: docRef.id, ...note, timestamp: new Date() },
      ];
      return sortNotes(updatedNotes); 
    });
  } catch (error) {
    console.error("Error adding note: ", error);
  }
};



// Function to update an existing note
export const updateNote = async (id, updatedNote, notes, setNotes) => {
  try {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, updatedNote);

    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === id ? { id, ...updatedNote } : note
      );
      return sortNotes(updatedNotes); 
    });
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};



// Function to delete a note
export const deleteNote = async (id, notes, setNotes) => {
  try {
    await deleteDoc(doc(db, "notes", id));

    setNotes(notes.filter((note) => note.id !== id));
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};



// Function to toggle the pinned state of a note
export const togglePin = async (id, notes, setNotes, setPinMessage) => {
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, pinned: !note.pinned };
    }
    return note;
  });

  setNotes(updatedNotes);

  try {
    const noteDoc = doc(db, "notes", id);
    const updatedNote = updatedNotes.find((note) => note.id === id);
    await updateDoc(noteDoc, { pinned: updatedNote.pinned });

    if (updatedNote.pinned) {
      setPinMessage("This note is pinned!");
      setTimeout(() => setPinMessage(""), 3000); 
    }
  } catch (error) {
    console.error("Error toggling pin status: ", error);
  }

  // Re-sort notes after pin toggle
  setNotes(sortNotes(updatedNotes));
};



// Function to sort notes (pinned first, then unpinned)
const sortNotes = (notes) => {
  return notes.sort((a, b) => {
    // First, sort by pinned status (true/false)
    if (a.pinned === b.pinned) {
      return new Date(b.timestamp) - new Date(a.timestamp); 
    }
    return b.pinned - a.pinned; 
  });
};
