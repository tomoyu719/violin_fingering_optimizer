import React, { useState } from "react";
// import SheetMusic from "./SheetMusic";
// import "./Radios.js";
import Button from "./Button";
// import { FingeringOptimizer } from "../positon"
// import FingeringOptimizer from "./position/FingeringOptimizer"
// import FingeringOptimizer from "../logic/fingeringOptimizer"
// import { SheetMusicABCJS } from "./SheetMusicABCJS";
// import { INSTRUMENTS } from "../constants";
import './App.css'
import { Radios } from "./Radios";
import MyPiano from "./MyPiano";
import BasicMenu from "./BasicMenu";
import { Menu, MenuItem } from "@mui/material";
import { Fingering } from "../logic/fingering";
import { InstrumentNames } from "../constants";
import { FingeringOptimizer } from "../logic/fingeringOptimizer";
import { InstrumentInfos } from "../logic/instrumentInfo";
import { SheetMusicABCJS } from "./SheetMusicABCJS";
import { FingeringOptimizer2 } from "../logic/fingeringOptimizer2";


function App() {
    const [midiNumbers, setMidiNumbers] = useState<number[]>([]);
    const [fingerings, setFingerings] = useState<Fingering[][]>([]);
    // const [fingerings, setFingerings] = useState<Fingering[]>([]);
    const [instrumentName, setInstrumentName] = useState<string>(InstrumentNames.VIOLIN);
    // const [optimizer, setOptimizer] = useState<FingeringOptimizer>(new FingeringOptimizer(InstrumentNames.VIOLIN));
    // const [optimizer, setOptimizer] = useState<FingeringOptimizer>(new FingeringOptimizer(InstrumentNames.VIOLIN));
    const [optimizer, setOptimizer] = useState<FingeringOptimizer2>(new FingeringOptimizer2(InstrumentNames.VIOLIN));

    const onClickKeyboard = (midiNumber: number): void => {
        setFingerings([]);
        setMidiNumbers([...midiNumbers, midiNumber])
    };

    const onChangeRadios = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInstrumentName(event.target.id);
        allClear();
        setOptimizer(new FingeringOptimizer2(event.target.id));
    }
    const doCompute = (): void => {
        if (midiNumbers.length >= 2) {
            let results: Fingering[][] = optimizer.computeOptimalFingering(midiNumbers);
            // let results: Fingering[] = optimizer.computeOptimalFingering(midiNumbers);
            setFingerings(results);
        }
    }
    const allClear = (): void => {
        setMidiNumbers([]);
        setFingerings([]);
    };

    const back = (): void => {
        if (midiNumbers.length > 0) {
            setMidiNumbers(midiNumbers.slice(0, midiNumbers.length - 1));
        }
        setFingerings([]);
    }

    return (
        <div>
            <h2 className="Title">Violin Fingering Optimizer</h2>
            <div className='SheetMusic'>
                <SheetMusicABCJS midiNumbers={midiNumbers} instrumentName={instrumentName} fingerings={fingerings} />
            </div>
            <div className="Inputs">
                <div className="Radios">
                    <Radios onChange={onChangeRadios} radioValue={instrumentName} />
                </div>
                <div className="Buttons">
                    <Button onClick={doCompute} label={'go'} className='Button' />
                    <Button onClick={back} label={'back'} className='Button' />
                    <Button onClick={allClear} label={'clear'} className='Button AllClear' />
                </div>

                <div className="PianoContainer">
                    <div className="Piano">
                        <MyPiano clickHandler={onClickKeyboard} instrumentName={instrumentName} />
                    </div>
                </div>

            </div>

        </div>
    );

}
export default App;