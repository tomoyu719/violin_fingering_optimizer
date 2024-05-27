import { SHIFTING_AFTER_OPENSTRING_BONUS } from '../constants';
import { Fingering } from './fingering'
import { InstrumentInfos } from './instrumentInfo';

export class FingeringOptimizer {
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
                    tmp.push([...fs, next]);
                }
            }
            // if (i !== midiNumbers.length - 1) {
            // tmp = this.reduceSameTail(tmp);
            // }
            tmp = this.reduceSameTail(tmp);
            results = [...tmp];
        }
        return results;
        // results = this.reduceByWeight(results);
        // return results;

        // let c = 99999999;
        // let reducedResults: Fingering[][] = [];
        // for (let r of results) {
        //     let sum = this.sumOfFingeringsPositions(r);
        //     if (sum == c) {
        //         reducedResults.push(r);
        //     } else if (sum < c) {
        //         c = sum;
        //         reducedResults = [r];
        //     }
        // }
        // return reducedResults;
        // if (results.length <= 3) {
        //     return results;
        // }

        // results = this.reduceByWeight(results, true);
        // results = [...results.slice(0, 3)];
        // console.log(results.length);
        // console.log(reducedResults.length);
        // return reducedResults;
        // return results;

    }

    isSameTail(fingeringsA: Fingering[], fingeringsB: Fingering[]) {
        let tailA = fingeringsA[fingeringsA.length - 1];
        let tailB = fingeringsB[fingeringsB.length - 1];
        return tailA.equals(tailB);
    }

    reduceSameTail(fingeringSequences: Fingering[][]) {
        let reduced: Fingering[][] = [];
        let processedIndices = new Set();
        for (let i = 0; i < fingeringSequences.length; i++) {
            if (processedIndices.has(i)) {
                continue;
            }
            let tail = fingeringSequences[i];
            let sameTails = fingeringSequences.filter(fs => this.isSameTail(fs, tail));
            let sameTailIndices = sameTails.map(fs => fingeringSequences.indexOf(fs));
            let sameTailIndicesNoProcessed = sameTailIndices.filter(i => !processedIndices.has(i));
            sameTailIndicesNoProcessed.forEach(i => processedIndices.add(i));
            let sameTailsNoProcessed = fingeringSequences.filter(fs => sameTailIndices.includes(fingeringSequences.indexOf(fs)))
            reduced = [...reduced, ...this.reduceByWeight(sameTailsNoProcessed)];
        }
        return reduced;
    }
    sumOfFingeringsPositions(fingeringSequence: Fingering[]): number {
        let sum = 0;
        for (let f of fingeringSequence) {
            sum += Math.max(0, f.position - f.finger * 2);
        }
        return sum;
    }

    reduceByWeight(fingeringSequences: Fingering[][]) {
        let minW = 9999999;
        let tmp: Fingering[][] = [];
        for (let fs of fingeringSequences) {
            let w = this.computeFingeringSequenceWeight2(fs);
            if (w < minW) {
                minW = w;
                tmp = [fs];
            } else if (w == minW) {
                tmp.push(fs);
            }
        }
        return tmp;
    }

    computeFingeringSequenceWeight2(fingeringSequence: Fingering[]) {
        let weightSum = 0;
        for (let i = 0; i < fingeringSequence.length - 1; i++) {
            let currentFingering = fingeringSequence[i];
            let nextFingering = fingeringSequence[i + 1];
            let prevFingering;
            if (i !== 0) {
                prevFingering = fingeringSequence[i - 1];
            }
            // weightSum += this.tmpComputeWeight2(currentFingering, nextFingering, prevFingering);
            weightSum += this.computeWeight(currentFingering, nextFingering, prevFingering);
        }
        return weightSum;
    }
    computeWeight(currentFingering: Fingering, nextFingering: Fingering, prevFingering?: Fingering) {
        let pos_diff = nextFingering.position - currentFingering.position;
        let finger_diff = nextFingering.finger - currentFingering.finger;
        let shiftingWeight;
        // if eigher is open-string.
        if (currentFingering.finger === 0 || nextFingering.finger === 0) {
            shiftingWeight = 0;
            // if (nextFingering.finger === 0) {
            //     shiftingWeight = 0;
            // } else if (prevFingering === undefined) {
            //     shiftingWeight = 0;
            // } else {
            //     pos_diff = nextFingering.position - prevFingering.position;
            //     finger_diff = nextFingering.finger - prevFingering.finger;
            //     shiftingWeight = this.getShiftingNum(pos_diff, finger_diff);
            // }
        } else {
            if (finger_diff === 0) {
                // avoid same finger slide
                shiftingWeight = this.getShiftingNum(pos_diff, finger_diff) * 2;
            } else {
                shiftingWeight = this.getShiftingNum(pos_diff, finger_diff);
            }
        }
        let changeStringWeight = Math.abs(nextFingering.stringOrder - currentFingering.stringOrder) ** 2;
        return shiftingWeight + changeStringWeight;
    }

    tmpComputeWeight2(currentFingering: Fingering, nextFingering: Fingering, prevFingering?: Fingering) {
        let pos_diff = nextFingering.position - currentFingering.position;
        let string_diff = nextFingering.stringOrder - currentFingering.stringOrder;
        let finger_diff = nextFingering.finger - currentFingering.finger;
        let shiftingPosWeight;
        if (nextFingering.finger === 0) {
            shiftingPosWeight = 0;
        } else if (currentFingering.finger === 0 && prevFingering !== undefined) {
            if (prevFingering.finger !== 0) {
                pos_diff = nextFingering.position - prevFingering.position;
                finger_diff = nextFingering.finger - prevFingering.finger;
                shiftingPosWeight = Math.floor(this.getShiftingNum(pos_diff, finger_diff) / SHIFTING_AFTER_OPENSTRING_BONUS);
            } else {
                shiftingPosWeight = 0;
            }
        } else {
            shiftingPosWeight = this.getShiftingNum(pos_diff, finger_diff);
        }
        // if (shiftingPosNum !== 0) {
        //     shiftingPosWeight += laterFingering.finger;
        // }
        // return shiftingPosNum + Math.abs(string_diff) ** 2;
        return shiftingPosWeight + Math.abs(string_diff) ** 2;
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

    // computeWeight(formerFingering: Fingering, laterFingering: Fingering) {
    //     let pos_diff = laterFingering.position - formerFingering.position;
    //     let string_diff = laterFingering.stringOrder - formerFingering.stringOrder;
    //     // let string_diff = laterFingering.stringOrder 
    //     let finger_diff = laterFingering.finger - formerFingering.finger;

    //     let shiftingPosNum;
    //     let shiftingPosWeight;
    //     if (formerFingering.position === 0 || laterFingering.position === 0) {
    //         shiftingPosNum = 0;
    //         shiftingPosWeight = shiftingPosNum;
    //     } else {
    //         shiftingPosNum = this.getShiftingNum(pos_diff, finger_diff);
    //         shiftingPosWeight = shiftingPosNum;
    //     }
    //     if (shiftingPosNum !== 0) {
    //         shiftingPosWeight += laterFingering.finger;
    //     }
    //     // return shiftingPosNum + Math.abs(string_diff) ** 2;
    //     return shiftingPosWeight + Math.abs(string_diff) ** 2;
    // }

    getFingerings(midiNumber: number) {
        let fingerings = [];
        for (let i = 0; i < this.instrumentInfos.stringNames.length; i++) {
            let stringMidiNumber = this.instrumentInfos.stringMidiNumbers[i];
            if (!this._isStringInRange(midiNumber, stringMidiNumber)) {
                continue;
            }
            let position = midiNumber - stringMidiNumber;
            // avoid open string, except lowest string
            if (position === 0 && i !== 0) {
                continue;
            }
            for (let finger of this._getFingers(position)) {
                fingerings.push(new Fingering(this.instrumentInfos.stringOrders[i], finger, position));
            }
        }
        return fingerings
    }

    _isStringInRange(midiNumber: number, openStringInMidiNumber: number) {
        let diff = midiNumber - openStringInMidiNumber;
        return 0 <= diff && diff <= this.position_limit;
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