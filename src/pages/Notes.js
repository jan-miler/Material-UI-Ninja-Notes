import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  //getNotes
  useEffect(() => {
    async function getNotes() {
      const res = await fetch("http://localhost:3004/notes");
      const notes = await res.json();
      setNotes(notes);
      return;
    }
    getNotes().catch(err => console.log(err.message));
  }, []);

  async function handleDelete(id) {
    await fetch(`http://localhost:3004/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter(note => note.id !== id));
  }

  const breakpoints = {
    default: 4,
    1500: 3,
    1100: 2,
    800: 1,
    500: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
