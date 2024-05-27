import PropTypes from 'prop-types';
import React, { Component, MouseEvent, useEffect, useRef } from 'react';
import abcjs, { AbcElem, ClickListener, ClickListenerAnalysis, ClickListenerDrag } from "abcjs";
import { MidiNumConverter } from '../logic/midiNumConverter';
import { MIDI_TO_ABC } from '../constants';
import { Fingering } from '../logic/fingering';
import { InstrumentInfos } from '../logic/instrumentInfo';
import { Button, Menu, MenuItem } from '@mui/material';

type MyProps = {
    midiNumbers: number[],
    fingerings: Fingering[][],
    // fingerings: Fingering[],
    instrumentName: string,
}

export const SheetMusicABCJS = (props: MyProps) => {
    const midiNumbers = props.midiNumbers;
    const fingerings = props.fingerings;
    const clef = new InstrumentInfos(props.instrumentName).clef;

    const myRef = useRef<HTMLDivElement>(null);
    // const myFunc = (abcElem: AbcElem, tuneNumber: number, classes: string, analysis: ClickListenerAnalysis, drag: ClickListenerDrag) => {
    // console.log(abcElem.abselem.counters.note);
    // console.log(drag.index);
    // console.log(midiNumbers);
    // console.log(midiNumbers[drag.index]);
    // setNote(midiNumbers[drag.index]);
    // console.log(open);
    // console.log(!open);
    // if (!open) {
    //     setAnchorEl(myRef.current!);
    // }
    // }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [note, setNote] = React.useState<null | number>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        let abc = '';
        if (fingerings.length !== 0 && midiNumbers.length !== 0) {
            for (let fs of fingerings) {
                abc += getNotes(midiNumbers, fs, props.instrumentName) + '|\n';
            }
            // abc += getNotes(midiNumbers, fingerings, props.instrumentName) + '|\n';
        } else if (midiNumbers.length !== 0) {
            abc += getNotes(midiNumbers, [], props.instrumentName) + '\n';
        } else {
            abc = 'X';
        }
        const padding = 15 * 2;
        const staffWidth = Math.min(window.innerWidth - padding, midiNumbers.length * 30 - padding)
        abcjs.renderAbc(myRef.current!, `X:1\nL:1/4\nK:C clef=${clef}\n${abc}`, {
            // clickListener: myFunc,
            selectionColor: '#000000',
            staffwidth: staffWidth,
            scale: 0.8,
            wrap: { minSpacing: 1, maxSpacing: 10, preferredMeasuresPerLine: 1, lastLineLimit: 10, minSpacingLimit: 10 }
        });
    })
    return (<div ref={myRef}>
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    </div>);
};


const getNotes = (notes: number[], fingerings: Fingering[], instrumentName: string) => {
    let abc = '';
    let infos = new InstrumentInfos(instrumentName);
    for (let i = 0; i < notes.length; i++) {
        let n;
        let f = '';
        if (notes.length !== 0 && fingerings.length !== 0) {
            if (i === 0 || fingerings[i].stringOrder !== fingerings[i - 1].stringOrder) {
                f += `${infos.stringNames[fingerings[i].stringOrder]}`;
                f += `${fingerings[i].finger}`;
            } else {
                f = `${fingerings[i].finger}`;
            }
            n = MIDI_TO_ABC.get(notes[i]);
            abc += `"${f}"${n}`;
        } else if (notes.length !== 0) {
            n = MIDI_TO_ABC.get(notes[i]);
            abc += `${n}`;
        }
    }
    return abc;
}
// const getNotes = (notes: number[], fingerings: Fingering[], instrumentName: string) => {
//     let abc = '';
//     let infos = new InstrumentInfos(instrumentName);
//     for (let i = 0; i < notes.length; i++) {
//         let n;
//         let f = '';
//         if (notes.length !== 0 && fingerings.length !== 0) {
//             if (i === 0 || fingerings[i].stringOrder !== fingerings[i - 1].stringOrder) {
//                 f += `${infos.stringNamesRoman[fingerings[i].stringOrder]}`;
//                 f += `${fingerings[i].finger}`;
//             } else {
//                 f = `${fingerings[i].finger}`;
//             }
//             n = MIDI_TO_ABC.get(notes[i]);
//             abc += `"${f}"${n}`;
//         } else if (notes.length !== 0) {
//             n = MIDI_TO_ABC.get(notes[i]);
//             abc += `${n}`;
//         }
//     }
//     return abc;
// }
