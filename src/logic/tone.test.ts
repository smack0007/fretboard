import { describe, expect, it } from "../test.ts";
import { Note } from "./note.ts";
import { Tone } from "./tone.ts";

describe("Tone", () => {
  it("E Scale", () => {
    const tone = new Tone(Note.E);
    let curTone = tone;

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.F);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.FSharp);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.G);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.GSharp);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.A);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.ASharp);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.B);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.C);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.CSharp);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.D);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.DSharp);
    expect(curTone.octave).toEqual(0);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.E);
    expect(curTone.octave).toEqual(1);

    curTone = curTone.nextSemiTone();
    expect(curTone.note).toEqual(Note.F);
    expect(curTone.octave).toEqual(1);
  });
});
