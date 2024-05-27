export class MidiNumConverter {
    constructor() {
        this.converter = this.getConverter();
    }
    getConverter() {
        const noteNames = ['C', '^C', 'D', '_E', 'E', 'F', '^F', 'G', '^G', 'A', '_B', 'B'];
        const middleCNum = 60
        const tmpMinMidiNum = 36;
        const tmpMaxMidiNum = 93;
        const x = {};
        for (let n = tmpMinMidiNum; n <= tmpMaxMidiNum; n++) {
            let pitch;
            if (n < middleCNum) {
                pitch = noteNames[n % noteNames.length] + ','.repeat(Math.ceil((middleCNum - n) / noteNames.length));
            } else {
                pitch = noteNames[n % noteNames.length] + "'".repeat(Math.floor((n - middleCNum) / noteNames.length));
            }
            x[n] = pitch;
        }
        return x;
    };
    convertToABC(midiNum) {
        return this.converter[midiNum];
    }
}
