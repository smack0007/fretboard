import { Note, NoteCount, NoteNames } from "./note.ts";

export class Tone {
  readonly rootNote: Note;
  readonly offset: number;

  get note(): Note {
    return (((this.rootNote as number) + this.offset) % NoteCount) as Note;
  }

  get octave(): number {
    return Math.floor(this.offset / NoteCount);
  }

  constructor(rootNote: Note, offset: number = 0) {
    this.rootNote = rootNote;
    this.offset = offset;
  }

  equals(other: Tone) {
    return this.note === other.note && this.octave === other.octave;
  }

  nextSemiTone(): Tone {
    return new Tone(this.rootNote, this.offset + 1);
  }

  toString(): string {
    return NoteNames[this.note];
  }
}
