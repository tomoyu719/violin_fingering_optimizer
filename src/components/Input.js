// import PropTypes from 'prop-types';
// import React, { Component, useEffect, useRef } from 'react';
// import abcjs from "abcjs";
// import { MidiNumConverter } from '../logic/midiNumConverter';
// import { INSTRUMENTS_TO_CLEFS, MIDI_TO_ABC } from '../constants';

// export const Input = (props) => {
//     const myRef = useRef(null);
//     const c = (x) => {
//         console.log(c);
//     }
//     function myClickListener(abcelem, tuneNumber, classes, analysis, drag, mouseEvent) {
//         console.log(abcelem, tuneNumber, classes, analysis, drag, mouseEvent);
//     }
//     useEffect(() => {
//         let abc = '';
//         const clef = INSTRUMENTS_TO_CLEFS[props.instrumentName];
//         const min = INSTRUMENTS_TO_MIN_MAX_NOTE[props.instrumentName]['min'];
//         const max = INSTRUMENTS_TO_MIN_MAX_NOTE[props.instrumentName]['max'];
//         for (let n = min; n <= max; n++) {
//             abc += MIDI_TO_ABC[n] + '|';
//         }
//         abcjs.renderAbc(myRef.current, `X:1\nL:1/4\nK:C clef=${clef}\n${abc}`, { scale: 0.8, clickListener: myClickListener });
//     });
//     return <div ref={myRef}></div>;
// }

// const INSTRUMENTS_TO_MIN_MAX_NOTE = {
//     violin: { min: 55, max: 93 },
//     viola: { min: 48, max: 86 },
// };