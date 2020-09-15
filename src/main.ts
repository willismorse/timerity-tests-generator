import * as fs from "fs";

console.log("Started main");

import { WaveFile } from 'wavefile';
import {NumericUtils} from "./NumericUtilities";
let wav = new WaveFile();

let sampleRate = 44100.0;

const halfSecond = sampleRate / 2;


let dataBuffer: Array<number> = Array(halfSecond * 2).fill(0);

// TODO: scaleRange is not inclusive; it never reaches 1. Is this a bug?
for (let i = 0; i < halfSecond; i++) {
    // dataBuffer[i] = i / halfSecond;
    dataBuffer[i] = NumericUtils.scaleRange(i, 0, halfSecond, 0, 1 );
}

// TODO: scaleRange does not work with reversed ranges
for (let i = halfSecond; i > 0; i--) {
    // dataBuffer[i + halfSecond] = 1.0 - (i / halfSecond);
    dataBuffer[i] = NumericUtils.scaleRange(i,  halfSecond, 0,  1, 0 );

}




wav.fromScratch(1, sampleRate, '32f', dataBuffer);

const generatedDirPath = './generated';
if (!fs.existsSync(generatedDirPath)){
    fs.mkdirSync(generatedDirPath);
}

let dataFilePath = `${generatedDirPath}/triangle-one-second.wav`;
fs.writeFileSync(dataFilePath, wav.toBuffer());
