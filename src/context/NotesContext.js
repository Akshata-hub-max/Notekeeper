import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };



  const addNote = async (note) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), note);
      setNotes((prev) => [...prev, { id: docRef.id, ...note }]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };



  const updateNote = async (id, updatedNote) => {
    try {
      await updateDoc(doc(db, "notes", id), updatedNote);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { id, ...updatedNote } : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };



  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, loading }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
