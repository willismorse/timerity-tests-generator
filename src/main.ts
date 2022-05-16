import * as fs from "fs";

console.log("Started main");

import { WaveFile } from 'wavefile';
import {NumericUtils} from "./NumericUtilities";

let sampleRate = 44100.0;


const generatedDirPath = './generated';
if (!fs.existsSync(generatedDirPath)) {
    fs.mkdirSync(generatedDirPath);
}

generateTriangle();
generateRampUp();


function generateTriangle() {
    let wav = new WaveFile();
    wav.fromScratch(1, sampleRate, '32f', generateTriangleCycleBuffer());


    let dataFilePath = `${generatedDirPath}/triangle-one-second.wav`;
    fs.writeFileSync(dataFilePath, wav.toBuffer());
}
function generateRampUp() {
    let wav = new WaveFile();
    wav.fromScratch(1, sampleRate, '32f', generateRampUpBuffer());


    let dataFilePath = `${generatedDirPath}/rampup-one-second.wav`;
    fs.writeFileSync(dataFilePath, wav.toBuffer());
}


function generateTriangleCycleBuffer(): Array<number> {
    const halfSecond = sampleRate / 2;
    const fullSecond = sampleRate;

    let dataBuffer: Array<number> = Array(halfSecond * 2).fill(0);

    /**
     * Generating perfectly looping and symmetrical waveforms is messy with an even number of samples.
     *
     * If you only want one 0 at the beginning, one 0 at the end and one 1 in the middle, you have to decide where to call
     * "middle": either the last sample of the first half buffer, or the first sample of the second half buffer.
     *
     * On the other hand, if you start and end with a 0, then there will be two successive 0's if you loop. So perhaps the
     * better solution is to double up on 1's, with one at end of first half buffer and one at start of second half buffer.
     *
     * Here we choose to duplicate 1's at end and start of each half buffer. Note the shenanigans involved in the
     * loop indices and inputRangeMax below. There's probably a more formal way to standardize this into a reusable
     * functional approach, but for now this works.
     *
     */
    let index = 0;
    for (let i = 0; i < halfSecond; i++) {
        dataBuffer[i] = NumericUtils.scaleRange(i, 0, halfSecond - 1, 0, 1 );
        index++;
    }

    for (let i = halfSecond; i < fullSecond; i++) {
        dataBuffer[i] = NumericUtils.scaleRange(i,  halfSecond, fullSecond - 1,  1, 0 );
        index++;
    }
    const first = dataBuffer[0];
    const midLeft = dataBuffer[halfSecond - 1];
    const midRight = dataBuffer[halfSecond ];
    const final = dataBuffer[fullSecond - 1];

    return dataBuffer;
}
function generateRampUpBuffer(): Array<number> {

    let dataBuffer: Array<number> = Array(sampleRate).fill(0);

    let index = 0;
    for (let i = 0; i < sampleRate; i++) {
        dataBuffer[i] = NumericUtils.scaleRange(i, 0, sampleRate - 1, 0, 1 );
        index++;
    }

    const first = dataBuffer[0];
    const final = dataBuffer[sampleRate - 1];

    return dataBuffer;
}
