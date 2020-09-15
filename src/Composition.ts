
export interface Composition {
    voices: Voice[];
}

export interface Voice {
    filePath: string;
    startTime: number;
    instrumentID: string;
    partID: string;
}


/*
Logical model:

Composition
    Instrument (track)
        Part
            Voice
                file
                startTimePart

            Voice
                file
                startTimePart

        Part
            ...
 */

/*
Physical playback model:

Composition
    Voice
        instrumentID
        partID
        file
        startTimeComposition

    Voice
        instrumentID
        partID
        file
        startTimeComposition

    ...
 */

//
