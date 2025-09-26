import "core-js";
import { jsx, jsxInit } from "./jsx.ts";
import { Fretboard } from "./components/Fretboard.tsx";
import { Note } from "./logic/note.ts";

jsxInit(
  document.getElementById("app")!,
  <Fretboard rootNotes={[Note.E, Note.B, Note.G, Note.D, Note.A, Note.E]} />
);
