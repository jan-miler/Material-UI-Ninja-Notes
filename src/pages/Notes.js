import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  masonryGrid: {
    display: "flex",
    marginLeft: " -30px",
    width: "auto",
  },

  masonryGridColumn: {
    paddingLeft: "30px",
    backgroundClip: "padding-box",

    " &>div": {
      marginBottom: "30px",
    },
  },
});

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const classes = useStyles();

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
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
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
