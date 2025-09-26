export const Note = {
  C: 0,
  CSharp: 1,
  DFlat: 1,
  D: 2,
  DSharp: 3,
  EFlat: 3,
  E: 4,
  F: 5,
  FSharp: 6,
  GFlat: 6,
  G: 7,
  GSharp: 8,
  AFlat: 8,
  A: 9,
  ASharp: 10,
  BFlat: 10,
  B: 11,
} as const;
export type Note = (typeof Note)[keyof typeof Note];

export const NoteCount = 12;

export const NoteNames: Readonly<Record<Note, string>> = {
  [Note.C]: "C",
  [Note.CSharp]: "C#/Db",
  [Note.D]: "D",
  [Note.DSharp]: "D#/Eb",
  [Note.E]: "E",
  [Note.F]: "F",
  [Note.FSharp]: "F#/Gb",
  [Note.G]: "G",
  [Note.GSharp]: "G#/Ab",
  [Note.A]: "A",
  [Note.ASharp]: "A#/Bb",
  [Note.B]: "B",
};
