import { InstrumentNames } from "../constants";

export class InstrumentInfos {
    stringOrders: number[] = [0, 1, 2, 3];;
    stringNamesRoman: string[] = ['Ⅳ', 'Ⅲ', 'Ⅱ', 'Ⅰ'];
    stringNames: string[];
    stringMidiNumbers: number[];
    positionLimits: number[];
    clef: string;
    constructor(instrumentName: string) {
        switch (instrumentName) {
            case InstrumentNames.VIOLIN:
                this.stringNames = ['G', 'D', 'A', 'E'];
                this.stringMidiNumbers = [55, 62, 69, 76];
                this.positionLimits = [10, 12, 14, 17];
                this.clef = 'treble';
                break;
            case InstrumentNames.VIOLA:
                this.stringNames = ['C', 'G', 'D', 'A'];
                this.stringMidiNumbers = [48, 55, 62, 69];
                this.positionLimits = [10, 12, 14, 17];
                this.clef = 'alto';
                break;
            default:
                throw `Invalid instrumentName ${instrumentName}`
        }
    }
}