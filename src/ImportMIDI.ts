import {Midi} from '@tonejs/midi'
import * as fs from "fs";
import {pairwise} from "./utilities/FunctionalUtilities";

class Note {
    constructor(freq: number, startTime: number) {

    }

}

function convertMIDINoteNumToFreq(midiNote: number) {
    let a = 440; //frequency of A (coomon value is 440Hz)
    return (a / 32) * (2 ** ((midiNote - 9) / 12));
}

function convertMIDIStartTimeToTime(time: number, ppq: number) {
    return time / ppq;
}

export function importMIDI(path: string ) {
    const midiData = fs.readFileSync(path)
    const midi = new Midi(midiData)

    // the file name decoded from the first track
    const ppq = 480;

    // get the tracks
    const notes: Note[] = [];
    midi.tracks.forEach(midiTrack => {

        // notes are an array
        const midiNotes = midiTrack.notes
        midiNotes.forEach(midiNote => {
            const freq = convertMIDINoteNumToFreq(midiNote.midi);
            const startTime = convertMIDIStartTimeToTime(midiNote.time, ppq);
            notes.push(new Note(freq, startTime));
        })
    });

    // Generate lerp-ed pitch curves from the extracted notes
    const notePairs = pairwise(notes);

    const debug = 0;
}

