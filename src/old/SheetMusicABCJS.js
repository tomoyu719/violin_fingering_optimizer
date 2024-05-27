// import PropTypes from 'prop-types';
// import React, { Component, useEffect, useRef } from 'react';
// import abcjs from "abcjs";
// import { MidiNumConverter } from '../logic/midiNumConverter';
// import { INSTRUMENT_TO_CLEFS, MIDI_TO_ABC } from '../constants';

// export const SheetMusicABCJS = (props) => {
//     const notes = props.notes;
//     const fingerings = props.fingerings;

//     const clef = INSTRUMENT_TO_CLEFS[props.instrumentName];
//     const myRef = useRef(null);
//     function clickListener(abcelem, tuneNumber, classes, analysis, drag, mouseEvent) {
//         // console.log(abcelem, tuneNumber, classes, analysis, drag, mouseEvent);
//         console.log(drag.index);
//     }
//     useEffect(() => {
//         let abc = '';
//         if (fingerings.length !== 0 && notes.length !== 0) {
//             for (let fs of fingerings) {
//                 abc += getNotes(notes, fs) + '|\n';
//             }
//         } else if (notes.length !== 0) {
//             abc += getNotes(notes, []) + '\n';
//         } else {
//             abc = 'X';
//         }
//         const staffWidth = Math.max(window.innerWidth, notes.length * window.innerWidth / 10)
//         abcjs.renderAbc(myRef.current, `X:1\nK:C clef=${clef}\n${abc}\n`, {
//             // staffwidth: staffWidth, scale: 0.8, selectionColor: "#000000"
//             clickListener: clickListener,
//             staffwidth: staffWidth, scale: 0.8
//         });
//     });
//     return <div ref={myRef}></div>;
// }

// const getNotes = (notes, fingerings) => {
//     let abc = '';
//     for (let i = 0; i < notes.length; i++) {
//         let n = '', f = '';
//         if (notes.length !== 0 && fingerings.length !== 0) {
//             f = fingerings[i];
//             n = MIDI_TO_ABC[notes[i]];
//             abc += `"${f}"${n}`;
//         } else if (notes.length !== 0) {
//             n = MIDI_TO_ABC[notes[i]];
//             abc += `${n}`;
//         }
//     }
//     return abc;
// }
