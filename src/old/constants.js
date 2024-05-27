// const INSTRUMENTS = ['violin', 'viola']
// const VIOLIN_STRING_NAMES = ['G', 'D', 'A', 'E'];
// const VIOLA_STRING_NAMES = ['C', 'G', 'D', 'A'];
// const CELLO_STRING_NAMES = ['C', 'G', 'D', 'A'];

// const SHIFTING_WITH_OPENSTRING_BONUS = 2;

// export const aaa = {
//     violin: {
//         lowest: {
//             order: 0,
//             name: 'G',
//             midiNumber: 55,
//         },
//         lower: {
//             order: 1,
//             name: 'D',
//             midiNumber: 62,
//         },
//         higher: {
//             order: 2,
//             name: 'A',
//             midiNumber: 69,
//         },
//         highest: {
//             order: 1,
//             name: 'D',
//             midiNumber: 76,
//         },
//     },
//     viola: {
//         lowest: 'C',
//         lower: 'G',
//         higher: 'D',
//         highest: 'A',
//     },
//     cello: {
//         lowest: 'C',
//         lower: 'G',
//         higher: 'D',
//         highest: 'A',
//     },


// }


// export const INSTRUMENTS_TO_CLEFS = {
//     violin: 'treble',
//     viola: 'alto',
// }


// export const VIOLIN_STRINGS_TO_PITCHES = {
//     G: 55,
//     D: 62,
//     A: 69,
//     E: 76
// }

// const VIOLIN_STRINGS_TO_NAMES = {
//     G: 0,
//     D: 1,
//     A: 2,
//     E: 3
// }

// const VIOLA_STRINGS_TO_PITCHES = {
//     C: 48,
//     G: 55,
//     D: 62,
//     A: 69,
// }

// const VIOLA_STRINGS_TO_NAMES = {
//     C: 0,
//     G: 1,
//     D: 2,
//     A: 3,
// }

// const ANNOTAIONS = [
//     { key: 'C2', midiNumber: 36 },
//     { key: 'D2', midiNumber: 38 },
//     { key: 'E2', midiNumber: 40 },
//     { key: 'F2', midiNumber: 41 },
//     { key: 'G2', midiNumber: 43 },
//     { key: 'A2', midiNumber: 45 },
//     { key: 'B2', midiNumber: 47 },
//     { key: 'C3', midiNumber: 48 },
//     { key: 'D3', midiNumber: 50 },
//     { key: 'E3', midiNumber: 52 },
//     { key: 'F3', midiNumber: 53 },
//     { key: 'G3', midiNumber: 55 },
//     { key: 'A3', midiNumber: 57 },
//     { key: 'B3', midiNumber: 59 },
//     { key: 'C4', midiNumber: 60 },
//     { key: 'D4', midiNumber: 62 },
//     { key: 'E4', midiNumber: 64 },
//     { key: 'F4', midiNumber: 65 },
//     { key: 'G4', midiNumber: 67 },
//     { key: 'A4', midiNumber: 69 },
//     { key: 'B4', midiNumber: 71 },
//     { key: 'C5', midiNumber: 72 },
//     { key: 'D5', midiNumber: 74 },
//     { key: 'E5', midiNumber: 76 },
//     { key: 'F5', midiNumber: 77 },
//     { key: 'G5', midiNumber: 79 },
//     { key: 'A5', midiNumber: 81 },
//     { key: 'B5', midiNumber: 83 },
//     { key: 'C6', midiNumber: 84 },
//     { key: 'D6', midiNumber: 86 },
//     { key: 'E6', midiNumber: 88 },
//     { key: 'F6', midiNumber: 89 },
//     { key: 'G6', midiNumber: 91 },
//     { key: 'A6', midiNumber: 93 },
// ];

// const MIDI_TO_ABC = {
//     36: "C,,",
//     37: "^C,,",
//     38: "D,,",
//     39: "_E,,",
//     40: "E,,",
//     41: "F,,",
//     42: "^F,,",
//     43: "G,,",
//     44: "^G,,",
//     45: "A,,",
//     46: "_B,,",
//     47: "B,,",
//     48: "C,",
//     49: "^C,",
//     50: "D,",
//     51: "_E,",
//     52: "E,",
//     53: "F,",
//     54: "^F,",
//     55: "G,",
//     56: "^G,",
//     57: "A,",
//     58: "_B,",
//     59: "B,",
//     60: "C",
//     61: "^C",
//     62: "D",
//     63: "_E",
//     64: "E",
//     65: "F",
//     66: "^F",
//     67: "G",
//     68: "^G",
//     69: "A",
//     70: "_B",
//     71: "B",
//     72: "C'",
//     73: "^C'",
//     74: "D'",
//     75: "_E'",
//     76: "E'",
//     77: "F'",
//     78: "^F'",
//     79: "G'",
//     80: "^G'",
//     81: "A'",
//     82: "_B'",
//     83: "B'",
//     84: "C''",
//     85: "^C''",
//     86: "D''",
//     87: "_E''",
//     88: "E''",
//     89: "F''",
//     90: "^F''",
//     91: "G''",
//     92: "^G''",
//     93: "A''",
// }
// // cons"B", CELLO_STRINGS_TO_PITCHES = {
// //     C: 36,
// //     G: 43,
// //     D: 50,
// //     A: 57,
// // }

// // const CONTRABASS_STRINGS_TO_PITCHES = {
// //     E: 16,
// //     A: 21,
// //     D: 26,
// //     G: 31,
// // }
// const INSTRUMENTS_TO_STRINGPITCHES = {
//     violin: VIOLIN_STRINGS_TO_PITCHES,
//     viola: VIOLA_STRINGS_TO_PITCHES,
// }

// const INSTRUMENTS_TO_STRINGNUMS = {
//     violin: VIOLIN_STRINGS_TO_NAMES,
//     viola: VIOLA_STRINGS_TO_NAMES,
// }

// const INSTRUMENTS_TO_STRINGNAMES = {
//     violin: VIOLIN_STRING_NAMES,
//     viola: VIOLA_STRING_NAMES,
// }


// export {
//     INSTRUMENTS,
//     INSTRUMENTS_TO_STRINGPITCHES,
//     INSTRUMENTS_TO_STRINGNUMS,
//     INSTRUMENTS_TO_STRINGNAMES,
//     VIOLIN_STRING_NAMES,
//     VIOLA_STRING_NAMES,
//     CELLO_STRING_NAMES,
//     INSTRUMENTS_TO_CLEFS,
//     VIOLIN_STRINGS_TO_PITCHES,
//     VIOLIN_STRINGS_TO_NAMES,
//     VIOLA_STRINGS_TO_PITCHES,
//     VIOLA_STRINGS_TO_NAMES,
//     ANNOTAIONS,
//     MIDI_TO_ABC,
//     SHIFTING_WITH_OPENSTRING_BONUS,
// }