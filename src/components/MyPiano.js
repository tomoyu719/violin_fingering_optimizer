import React, { Component } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
import PropTypes from 'prop-types'
import { ANNOTAIONS } from '../constants';

export default class MyPiano extends Component {

    static propTypes = {
        clickHandler: PropTypes.func.isRequired,
        instrumentName: PropTypes.string.isRequired,
    };
    getFirstNote() {
        const name = this.props.instrumentName;
        let first;
        // todo enable hard-coding
        if (name === 'violin') {
            // todo enable hard-coding
            first = MidiNumbers.fromNote('g3');
        } else if (name === 'viola') {
            first = MidiNumbers.fromNote('c3');
        } else if (name === 'cello') {
            first = MidiNumbers.fromNote('c2');
        } else {
            throw 'aaaaa';
        }
        return first;
    }
    getLastNote() {
        const name = this.props.instrumentName;
        let last;
        // todo enable hard-coding
        if (name === 'violin') {
            // todo enable hard-coding
            last = MidiNumbers.fromNote('a6');
        } else if (name === 'viola') {
            last = MidiNumbers.fromNote('d6');
        } else if (name === 'cello') {
            last = MidiNumbers.fromNote('d5');
        } else {
            //TODO cause error
        }
        return last;
    }

    render() {
        return (
            <Piano
                noteRange={{ first: this.getFirstNote(), last: this.getLastNote() }}
                // noteRange={{ first: this.state.firstNote, last: this.state.lastNote }}
                playNote={(midiNumber) => { }}
                stopNote={this.props.clickHandler}
                width={1200}
                keyboardShortcuts={ANNOTAIONS}
            />
        );
    }
}