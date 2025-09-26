import { jsx, JsxElement } from "../jsx.ts";
import { Tone } from "../logic/tone.ts";
import type { Fretboard } from "./Fretboard.tsx";

const FretsToMark: number[] = [3, 5, 7, 9, 12, 15, 17, 19, 21];

export class Fret extends JsxElement {
  _index: number = 0;
  _tones: Tone[] = [];
  _toneElements: HTMLElement[] = undefined!;

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get tones(): Tone[] {
    return this._tones;
  }

  set tones(value: Tone[]) {
    this._tones = value;
  }

  override render(): HTMLElement {
    this._toneElements = this.tones.map((tone) => (
      <div
        class="tone"
        onMouseOver={(ev) => {
          (ev.target as HTMLElement).classList.add("hover");
          (this.parent as Fretboard).highlightTone(tone);
        }}
        onMouseLeave={(ev) => {
          (ev.target as HTMLElement).classList.remove("hover");
          (this.parent as Fretboard).unhighlightTone(tone);
        }}
      >
        {tone}
      </div>
    ));

    const buildIndexElements = () => {
      const indexElements: HTMLElement[] = [
        FretsToMark.includes(this.index) ? (
          <div class="dot"></div>
        ) : (
          <div class="blank"></div>
        ),
      ];

      if (this.index === 12) {
        indexElements.push(<div class="dot"></div>);
      }

      return indexElements;
    };

    return (
      <div class="fret">
        <div class="index">{buildIndexElements()}</div>
        {this._toneElements}
        <div class="index">{buildIndexElements()}</div>
      </div>
    );
  }

  highlightTone(tone: Tone): void {
    for (let i = 0; i < this._tones.length; i += 1) {
      if (!this._toneElements[i]!.classList.contains("hover")) {
        if (this._tones[i]!.equals(tone)) {
          this._toneElements[i]!.classList.add("highlight-1");
        } else if (this._tones[i]!.note === tone.note) {
          this._toneElements[i]!.classList.add("highlight-2");
        }
      }
    }
  }

  unhighlightTone(tone: Tone): void {
    for (let i = 0; i < this._tones.length; i += 1) {
      if (this._tones[i]!.equals(tone)) {
        this._toneElements[i]!.classList.remove("highlight-1");
      } else if (this._tones[i]!.note === tone.note) {
        this._toneElements[i]!.classList.remove("highlight-2");
      }
    }
  }
}
