import { jsx, JsxElement } from "../jsx.ts";
import { Note } from "../logic/note.ts";
import { Tone } from "../logic/tone.ts";
import { Fret } from "./Fret.tsx";

const FretCount = 22;

export class Fretboard extends JsxElement {
  _rootNotes: Note[] = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E];
  _frets: HTMLElement[] = [];

  get rootNotes(): Note[] {
    return this._rootNotes;
  }

  set rootNotes(value: Note[]) {
    this._rootNotes = value;
  }

  constructor() {
    super();
  }

  override render(): HTMLElement {
    this._frets = [];
    let tones = this._rootNotes.map((note) => new Tone(note));

    for (let i = 0; i <= FretCount; i++) {
      this._frets.push(<Fret class={`fret-${i}`} index={i} tones={tones} />);
      tones = tones.map((tone) => tone.nextSemiTone());
    }

    return <div class="fretboard">{this._frets}</div>;
  }

  highlightTone(tone: Tone): void {
    for (const child of this.children) {
      (child as Fret).highlightTone(tone);
    }
  }

  unhighlightTone(tone: Tone): void {
    for (const child of this.children) {
      (child as Fret).unhighlightTone(tone);
    }
  }
}
