import { SHIFTING_AFTER_OPENSTRING_BONUS } from '../constants';
import { Fingering } from './fingering'
import { InstrumentInfos } from './instrumentInfo';

export class FingeringOptimizer2 {
    instrumentInfos: InstrumentInfos;
    position_limit: number;
    constructor(instrumentName: string) {
        this.instrumentInfos = new InstrumentInfos(instrumentName);
        // if violin e-string, A6.
        this.position_limit = 17;
    }
    computeOptimalFingering(midiNumbers: number[]) {
        let results: Fingering[][] = this.getFingerings(midiNumbers[0]).map(f => [f]);
        for (let i = 1; i < midiNumbers.length; i++) {
            let tmp: Fingering[][] = [];
            for (let fs of results) {
                for (let next of this.getFingerings(midiNumbers[i])) {
                    let duplicateTails = tmp.filter(e => e[e.length - 1].equals(next));
                    if (duplicateTails.length !== 0) {
                        let weightA = this.computeFingeringSequenceWeight(duplicateTails[0]);
                        let weightB = this.computeFingeringSequenceWeight([...fs, next]);
                        if (weightA > weightB) {
                            tmp = tmp.filter(e => !e[e.length - 1].equals(next));
                            tmp.push([...fs, next])
                        } else if (weightA === weightB) {
                            tmp.push([...fs, next])
                        }
                    } else {
                        tmp.push([...fs, next])
                    }
                }
            }
            results = [...tmp];
        }
        // return results;
        results = this.reduceByWeight(results);
        results = this.reduceByPositionSum(results);
        return results;
    }

    // isSameTail(fingeringsA: Fingering[], fingeringsB: Fingering[]) {
    //     let tailA = fingeringsA[fingeringsA.length - 1];
    //     let tailB = fingeringsB[fingeringsB.length - 1];
    //     return tailA.equals(tailB);
    // }

    sumOfFingeringsPositions(fingeringSequence: Fingering[]): number {
        let sum = 0;
        for (let f of fingeringSequence) {
            sum += Math.max(0, f.position);
        }
        return sum;
    }
    reduceByPositionSum(fingeringSequences: Fingering[][]) {
        let minW = 9999999;
        let tmp: Fingering[][] = [];
        for (let fs of fingeringSequences) {
            let w = this.sumOfFingeringsPositions(fs);
            if (w < minW) {
                minW = w;
                tmp = [fs];
            } else if (w == minW) {
                tmp.push(fs);
            }
        }
        return tmp;
    }
    reduceByWeight(fingeringSequences: Fingering[][]) {
        let minW = 9999999;
        let tmp: Fingering[][] = [];
        for (let fs of fingeringSequences) {
            let w = this.computeFingeringSequenceWeight(fs);
            if (w < minW) {
                minW = w;
                tmp = [fs];
            } else if (w == minW) {
                tmp.push(fs);
            }
        }
        return tmp;
    }


    computeFingeringSequenceWeight(fingeringSequence: Fingering[]) {
        let weightSum = 0;
        let previousFingeringNotOpenString;
        for (let i = 0; i < fingeringSequence.length - 1; i++) {
            let currentFingering = fingeringSequence[i];
            let nextFingering = fingeringSequence[i + 1];
            weightSum += this.computeWeight(currentFingering, nextFingering, previousFingeringNotOpenString);
            if (currentFingering.finger !== 0) {
                previousFingeringNotOpenString = currentFingering;
            }
        }
        return weightSum;
    }

    computeWeight(currentFingering: Fingering, nextFingering: Fingering, previousFingering?: Fingering) {
        let pos_diff = nextFingering.position - currentFingering.position;
        let finger_diff = nextFingering.finger - currentFingering.finger;
        let shiftingWeight;
        if (this.isEitherOpenString(nextFingering, currentFingering)) {
            if (nextFingering.finger === 0) {
                shiftingWeight = 0;
            } else {
                if (previousFingering === undefined) {
                    shiftingWeight = 0;
                } else if (previousFingering.finger === 0) {
                    shiftingWeight = 0;
                } else {
                    pos_diff = nextFingering.position - previousFingering.position;
                    finger_diff = nextFingering.finger - previousFingering.finger;
                    shiftingWeight = this.getShiftingNum(pos_diff, finger_diff);
                }
            }
        } else {
            shiftingWeight = this.getShiftingNum(pos_diff, finger_diff);
            if (this.isSameFingerDifferentPosition(currentFingering, nextFingering)) {
                // half tone: 1
                // whole tone: 4
                shiftingWeight = shiftingWeight ** 2;
            }
        }
        let changeStringWeight = Math.abs(nextFingering.stringOrder - currentFingering.stringOrder) ** 2;
        return shiftingWeight + changeStringWeight;
    }
    isEitherOpenString(a: Fingering, b: Fingering) {
        return a.finger === 0 || b.finger === 0;
    }

    isSameFingerDifferentPosition(a: Fingering, b: Fingering) {
        if (a.finger === 0 || b.finger === 0) {
            return false;
        }
        return a.finger === b.finger && a.position !== b.position;
    }

    getShiftingNum(pos_diff: number, finger_diff: number): number {
        let shiftingPosNum = 0
        switch (finger_diff) {
            case -3:
                shiftingPosNum = Math.min(Math.abs(pos_diff + 6), Math.abs(pos_diff + 5));
                break;
            case -2:
                shiftingPosNum = Math.min(Math.abs(pos_diff + 4), Math.abs(pos_diff + 3));
                break;
            case -1:
                shiftingPosNum = Math.min(Math.abs(pos_diff + 2), Math.abs(pos_diff + 1));
                break;
            case 0:
                shiftingPosNum = Math.abs(pos_diff);
                break;
            case 1:
                shiftingPosNum = Math.min(Math.abs(pos_diff - 1), Math.abs(pos_diff - 2));
                break;
            case 2:
                shiftingPosNum = Math.min(Math.abs(pos_diff - 3), Math.abs(pos_diff - 4));
                break;
            case 3:
                shiftingPosNum = Math.min(Math.abs(pos_diff - 5), Math.abs(pos_diff - 6));
                break;
        }
        return shiftingPosNum;
    }

    getFingerings(midiNumber: number) {
        let fingerings = [];
        let positionLimits = this.instrumentInfos.positionLimits;
        for (let i = 0; i < this.instrumentInfos.stringNames.length; i++) {
            let stringMidiNumber = this.instrumentInfos.stringMidiNumbers[i];
            if (!this._isStringInRange(midiNumber, stringMidiNumber, positionLimits[i])) {
                continue;
            }
            let position = midiNumber - stringMidiNumber;
            // // avoid open string, except lowest string
            // if (position === 0 && i !== 0) {
            //     continue;
            // }
            for (let finger of this._getFingers(position)) {
                fingerings.push(new Fingering(this.instrumentInfos.stringOrders[i], finger, position));
            }
        }
        return fingerings
    }

    _isStringInRange(midiNumber: number, openStringInMidiNumber: number, posLimit: number) {
        let diff = midiNumber - openStringInMidiNumber;
        return 0 <= diff && diff <= posLimit;
    }

    _getFingers(position: number) {
        if (position === 0) {
            return [0];
        } else if (position === 1) {
            return [1];
        } else if (position === 2) {
            return [1, 2];
        } else if (position === 3) {
            return [1, 2, 3];
        } else {
            return [1, 2, 3, 4];
        }
    }
}