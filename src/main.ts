import * as fs from "fs";

console.log("Started main");

import { WaveFile } from 'wavefile';
let wav = new WaveFile();

let sampleRate = 44100.0;

const halfSecond = sampleRate / 2;


let dataBuffer: Array<number> = Array(halfSecond * 2).fill(0);

for (let i = 0; i < halfSecond; i++) {
    dataBuffer[i] = i / halfSecond;
}
for (let i = 0; i < halfSecond; i++) {
    dataBuffer[i + halfSecond] = 1.0 - (i / halfSecond);
}




wav.fromScratch(1, sampleRate, '32f', dataBuffer);

const generatedDirPath = './generated';
if (!fs.existsSync(generatedDirPath)){
    fs.mkdirSync(generatedDirPath);
}

let dataFilePath = `${generatedDirPath}/triangle-one-second.wav`;
fs.writeFileSync(dataFilePath, wav.toBuffer());
