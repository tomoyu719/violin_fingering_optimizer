// import { INSTRUMENTS_TO_STRINGNAMES, INSTRUMENTS_TO_STRINGNUMS, INSTRUMENTS_TO_STRINGPITCHES, SHIFTING_WITH_OPENSTRING_BONUS } from '../constants';
// import { Fingering } from './fingering'

// export class FingeringOptimizer {
//     constructor(instrumentName) {
//         if (typeof instrumentName === "undefined") {
//             throw 'InstrumentName not provided';
//         }
//         this.stringNames = INSTRUMENTS_TO_STRINGNAMES[instrumentName];
//         this.stringNums = INSTRUMENTS_TO_STRINGNUMS[instrumentName];
//         this.stringPitches = INSTRUMENTS_TO_STRINGPITCHES[instrumentName];
//         this.position_limit = 17;
//     }

//     computeOptimalFingering(pitches) {
//         let results = this.getFingerings(pitches[0]).map(f => [f]);
//         for (let i = 1; i < pitches.length; i++) {
//             let tmp = [];
//             for (let fs of results) {
//                 for (let next of this.getFingerings(pitches[i])) {
//                     tmp.push([...fs, next]);
//                 }
//             }
//             if (i !== pitches.length - 1) {
//                 tmp = this.reduceSameTail(tmp);
//             }
//             results = [...tmp];
//         }
//         // return results;
//         if (results.length <= 3) {
//             return results;
//         }
//         results = this.reduceByWeight(results);
//         // results = this.reduceByWeight(results, true);
//         results = [...results.slice(0, 3)];
//         return results;
//     }

//     isSameTail(fingeringSequenceA, fingeringSequenceB) {
//         let tailA = fingeringSequenceA[fingeringSequenceA.length - 1];
//         let tailB = fingeringSequenceB[fingeringSequenceB.length - 1];
//         return tailA.equals(tailB);
//     }

//     reduceSameTail(fingeringSequences) {
//         let reduced = [];
//         let processedIndices = new Set();
//         for (let i = 0; i < fingeringSequences.length; i++) {
//             if (processedIndices.has(i)) {
//                 continue;
//             }
//             let tail = fingeringSequences[i];
//             let sameTails = fingeringSequences.filter(fs => this.isSameTail(fs, tail));
//             let sameTailIndices = sameTails.map(fs => fingeringSequences.indexOf(fs));
//             let sameTailIndicesNoProcessed = sameTailIndices.filter(i => !processedIndices.has(i));
//             sameTailIndicesNoProcessed.forEach(i => processedIndices.add(i));
//             let sameTailsNoProcessed = fingeringSequences.filter(fs => sameTailIndices.includes(fingeringSequences.indexOf(fs)))
//             reduced = [...reduced, ...this.reduceByWeight(sameTailsNoProcessed)];
//         }
//         return reduced;
//     }

//     reduceByWeight(fingeringSequences, withoutOpenStrings = false) {
//         let minW = 9999999;
//         let tmp = [];
//         for (let fs of fingeringSequences) {
//             let w = withoutOpenStrings
//                 ? this.computeFingeringSequenceWeightWithoutOpenString(fs)
//                 // : this.computeFingeringSequenceWeight(fs);
//                 : this.tmpComputeFingeringSequenceWeight2(fs);
//             if (w < minW) {
//                 minW = w;
//                 tmp = [fs];
//             } else if (w == minW) {
//                 tmp.push(fs);
//             }
//         }
//         return tmp;
//     }

//     computeFingeringSequenceWeightWithoutOpenString(fingeringSequence) {
//         let fingeringSequenceWithoutOpenString = fingeringSequence.filter(f => f.position !== 0);
//         return this.computeFingeringSequenceWeight(fingeringSequenceWithoutOpenString);
//     }

//     computeFingeringSequenceWeight(fingeringSequence) {
//         let weightSum = 0;
//         for (let i = 0; i < fingeringSequence.length - 1; i++) {
//             let formerFingering = fingeringSequence[i];
//             let laterFingering = fingeringSequence[i + 1];
//             weightSum += this.computeWeight(formerFingering, laterFingering);
//         }
//         return weightSum;
//     }
//     tmpComputeFingeringSequenceWeight2(fingeringSequence) {
//         let weightSum = 0;
//         for (let i = 0; i < fingeringSequence.length - 1; i++) {
//             let currentFingering = fingeringSequence[i];
//             let nextFingering = fingeringSequence[i + 1];
//             let prevFingering;
//             if (i !== 0) {
//                 prevFingering = fingeringSequence[i - 1];
//             }
//             weightSum += this.tmpComputeWeight2(currentFingering, nextFingering, prevFingering);
//         }
//         return weightSum;
//     }

//     tmpComputeWeight2(currentFingering, nextFingering, prevFingering) {
//         let pos_diff = nextFingering.position - currentFingering.position;
//         let string_diff = nextFingering.string - currentFingering.string;
//         let finger_diff = nextFingering.finger - currentFingering.finger;
//         let shiftingPosWeight;
//         if (nextFingering.finger === 0) {
//             shiftingPosWeight = 0;
//         } else if (currentFingering.finger === 0 && prevFingering !== undefined) {
//             if (prevFingering.finger !== 0) {
//                 pos_diff = nextFingering.position - prevFingering.position;
//                 finger_diff = nextFingering.finger - prevFingering.finger;
//                 shiftingPosWeight = Math.floor(this.getShiftingNum(pos_diff, finger_diff), SHIFTING_WITH_OPENSTRING_BONUS);
//             } else {
//                 shiftingPosWeight = 0;
//             }
//         } else {
//             shiftingPosWeight = this.getShiftingNum(pos_diff, finger_diff);
//         }
//         // if (shiftingPosNum !== 0) {
//         //     shiftingPosWeight += laterFingering.finger;
//         // }
//         // return shiftingPosNum + Math.abs(string_diff) ** 2;
//         return shiftingPosWeight + Math.abs(string_diff) ** 2;
//     }

//     getShiftingNum(pos_diff, finger_diff) {
//         let shiftingPosNum = 0
//         switch (finger_diff) {
//             case -3:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff + 6), Math.abs(pos_diff + 5));
//                 break;
//             case -2:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff + 4), Math.abs(pos_diff + 3));
//                 break;
//             case -1:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff + 2), Math.abs(pos_diff + 1));
//                 break;
//             case 0:
//                 shiftingPosNum = Math.abs(pos_diff);
//                 break;
//             case 1:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff - 1), Math.abs(pos_diff - 2));
//                 break;
//             case 2:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff - 3), Math.abs(pos_diff - 4));
//                 break;
//             case 3:
//                 shiftingPosNum = Math.min(Math.abs(pos_diff - 5), Math.abs(pos_diff - 6));
//                 break;
//         }
//         return shiftingPosNum;
//     }

//     computeWeight(formerFingering, laterFingering) {
//         let pos_diff = laterFingering.position - formerFingering.position;
//         let string_diff = laterFingering.string - formerFingering.string;
//         let finger_diff = laterFingering.finger - formerFingering.finger;

//         let shiftingPosNum;
//         let shiftingPosWeight;
//         // if either is open-string
//         if (formerFingering.position === 0 || laterFingering.position === 0) {
//             shiftingPosNum = 0;
//             shiftingPosWeight = shiftingPosNum;
//         } else {
//             shiftingPosNum = this.getShiftingNum(pos_diff, finger_diff);
//             shiftingPosWeight = shiftingPosNum;
//         }
//         if (shiftingPosNum !== 0) {
//             shiftingPosWeight += laterFingering.finger;
//         }
//         // return shiftingPosNum + Math.abs(string_diff) ** 2;
//         return shiftingPosWeight + Math.abs(string_diff) ** 2;
//     }

//     getFingerings(pitch) {
//         let fingerings = [];
//         for (let name of this.stringNames) {
//             let openStringPitch = this.stringPitches[name];
//             if (!this._isStringInRange(pitch, openStringPitch)) {
//                 continue;
//             }
//             let position = pitch - openStringPitch;
//             for (let finger of this._getFingers(position)) {
//                 fingerings.push(new Fingering(this.stringNums[name], finger, position));
//             }
//         }
//         return fingerings
//     }

//     _isStringInRange(pitch, openStringPitch) {
//         let diff = pitch - openStringPitch;
//         return 0 <= diff && diff <= this.position_limit;
//     }

//     _getFingers(position) {
//         if (position === 0) {
//             return [0];
//         } else if (position === 1) {
//             return [1];
//         } else if (position === 2) {
//             return [1, 2];
//         } else if (position === 3) {
//             return [1, 2, 3];
//         } else {
//             return [1, 2, 3, 4];
//         }
//     }

//     // countShiftingNumInN_Notes(fingeringSequence, n) {
//     //     let sum = 0;
//     //     for (let i = 0; i <= fingeringSequence.length - n; i++) {
//     //         let positionMoveNum = 0;
//     //         for (let j = i; j < i + n - 1; j++) {
//     //             const f = fingeringSequence[j];
//     //             const l = fingeringSequence[j + 1];
//     //             const pos_diff = l.position - f.position;
//     //             const finger_diff = l.finger - f.finger;
//     //             const shiftingNum = this.getShiftingNum(pos_diff, finger_diff)
//     //             if (shiftingNum != 0) {
//     //                 positionMoveNum += 1;
//     //             }
//     //         }
//     //         sum += positionMoveNum ** 2;
//     //     }
//     //     return sum;
//     // }

//     // countHigherStringNum(fingeringSequence) {
//     //     let sum = 0;
//     //     for (let f of fingeringSequence) {
//     //         sum += Number(f.string);
//     //     }
//     //     return sum;
//     // }

//     // countOpenStringNum(fingeringSequence) {
//     //     let sum = 0;
//     //     for (let f of fingeringSequence) {
//     //         if (f.position === 0) {
//     //             sum += 1;
//     //         }
//     //     }
//     //     return sum;
//     // }

//     // positionsSum(fingeringSequence) {
//     //     let sum = 0;
//     //     for (let f of fingeringSequence) {
//     //         sum += f.position;
//     //     }
//     //     return sum;
//     // }



//     // removeSameFirstAndLast(fingeringSequences) {
//     //     if (fingeringSequences.length == 1) {
//     //         return fingeringSequences;
//     //     }
//     //     var results = [];
//     //     let processedIndices = new Set();
//     //     for (let i = 0; i < fingeringSequences.length - 1; i++) {
//     //         if (processedIndices.has(i)) {
//     //             continue;
//     //         }
//     //         let fs_i = fingeringSequences[i];
//     //         let optims = [fs_i];
//     //         let minWeight = this.computeFingeringSequenceWeight(fs_i);
//     //         for (let j = i + 1; j < fingeringSequences.length; j++) {
//     //             if (processedIndices.has(j)) {
//     //                 continue;
//     //             }
//     //             let fs_j = fingeringSequences[j];
//     //             if (this.isSameFirstAndLast(fs_i, fs_j)) {
//     //                 processedIndices.add(j);
//     //                 let w = this.computeFingeringSequenceWeight(fs_j);
//     //                 if (minWeight > w) {
//     //                     minWeight = w;
//     //                     optims = [fs_j];
//     //                 } else if (minWeight === w) {
//     //                     optims.push(fs_j);
//     //                 }
//     //             }
//     //         }
//     //         results = [...results, ...optims];
//     //     }
//     //     return results;
//     //     // fingering sequences, no duplication first and last fingering with others.
//     // }

//     // isSameFirstAndLast(fingeringSequenceA, fingeringSequenceB) {
//     //     let firstA = fingeringSequenceA[0];
//     //     let firstB = fingeringSequenceB[0];
//     //     let lastA = fingeringSequenceA[fingeringSequenceA.length - 1];
//     //     let lastB = fingeringSequenceB[fingeringSequenceB.length - 1];
//     //     return firstA.equals(firstB) && lastA.equals(lastB);
//     // }

//     // computeOptimalFingering(pitches) {

//     //     // list -> list in list
//     //     var allFingeringSequences = this.getFingerings(pitches[0]).map(e => [e]);
//     //     for (let i = 0; i < pitches.length - 1; i++) {
//     //         let fingeringSequences = [];
//     //         for (let ffs of allFingeringSequences) {
//     //             for (let lf of this.getFingerings(pitches[i + 1])) {
//     //                 fingeringSequences.push([...ffs, lf])
//     //             }
//     //         }
//     //         fingeringSequences = this.removeSameFirstAndLast(fingeringSequences);
//     //         allFingeringSequences = [...fingeringSequences];
//     //     }

//     //     var minW = 9999999999;
//     //     var tmp = [];
//     //     for (let fs of allFingeringSequences) {
//     //         let w = this.computeFingeringSequenceWeight(fs);
//     //         if (minW == w) {
//     //             tmp.push(fs);
//     //         } else if (minW > w) {
//     //             minW = w;
//     //             tmp = [fs];
//     //         }
//     //     }
//     //     allFingeringSequences = [...tmp];
//     //     if (allFingeringSequences.length == 1) {
//     //         return allFingeringSequences;
//     //     }

//     //     var minW = 9999999999;
//     //     var tmp = [];
//     //     for (let n = 3; n < 10; n++) {
//     //         for (let fs of allFingeringSequences) {
//     //             let w = this.countShiftingNumInN_Notes(fs, n);
//     //             if (minW == w) {
//     //                 tmp.push(fs);
//     //             } else if (minW > w) {
//     //                 minW = w;
//     //                 tmp = [fs];
//     //             }
//     //         }
//     //         if (tmp.length == 1) {
//     //             break;
//     //         }
//     //     }
//     //     allFingeringSequences = [...tmp];


//     //     // x.countShiftingNumInN_Notes(fs, 3);

//     //     // var maxW = 0;
//     //     // for (let fs of allFingeringSequences) {
//     //     //     let w = this.countHigherStringNum(fs);
//     //     //     maxW = Math.max(maxW, w);
//     //     // }
//     //     // allFingeringSequences = allFingeringSequences.filter(fs => this.countHigherStringNum(fs) === maxW);


//     //     // var minOsn = 9999999999;
//     //     // for (let fs of allFingeringSequences) {
//     //     //     let osn = this.countOpenStringNum(fs);
//     //     //     minOsn = Math.min(minOsn, osn);
//     //     // }
//     //     // allFingeringSequences = allFingeringSequences.filter(fs => this.countOpenStringNum(fs) === minOsn);

//     //     // filter same finger shifting
//     //     // minW = 9999999999;
//     //     // for (let fs of allFingeringSequences) {
//     //     //     let w = this.countSameFingerButDifferentPosition(fs);
//     //     //     minW = Math.min(minW, w);
//     //     // }
//     //     // allFingeringSequences = allFingeringSequences.filter(fs => this.countSameFingerButDifferentPosition(fs) === minW);

//     //     // filter abusing open-string 
//     //     // minW = 9999999999;
//     //     // for (let fs of allFingeringSequences) {
//     //     //     let w = this.computeFingeringSequenceWeightWithoutOpenString(fs);
//     //     //     minW = Math.min(minW, w);
//     //     // }
//     //     // allFingeringSequences = allFingeringSequences.filter(fs => this.computeFingeringSequenceWeightWithoutOpenString(fs) === minW);

//     //     // filter same weight but high position
//     //     // minW = 9999999999;
//     //     // for (let fs of allFingeringSequences) {
//     //     //     let w = this.positionsSum(fs);
//     //     //     minW = Math.min(minW, w);
//     //     // }
//     //     // allFingeringSequences = allFingeringSequences.filter(fs => this.positionsSum(fs) === minW);

//     //     return allFingeringSequences;

//     //     // allFingeringSequences = allFingeringSequences[0];
//     //     // return allFingeringSequences;
//     // }

//     // countSameFingerButDifferentPosition(fingeringSequence) {
//     //     let n = 0;
//     //     for (let i = 0; i < fingeringSequence.length - 1; i++) {
//     //         let f = fingeringSequence[i];
//     //         let l = fingeringSequence[i + 1];
//     //         if (this.isSameFingerButDifferentPosition(f, l)) {
//     //             n += 1;
//     //         }
//     //     }
//     //     return n;
//     // }

//     // isSameFingerButDifferentPosition(f, l) {
//     //     return f.finger === l.finger && f.position !== l.position;
//     // }
// }

// // const x = new FingeringOptimizer()
// // var fs = [new Fingering(0, 0, 0), new Fingering(0, 1, 2), new Fingering(0, 2, 4), new Fingering(0, 3, 5), new Fingering(0, 4, 7)];
// // var w = x.countShiftingNumInN_Notes(fs, 3);
// // console.log(w);
// // var fs = [new Fingering(0, 0, 0), new Fingering(0, 1, 2), new Fingering(0, 2, 4), new Fingering(0, 1, 5), new Fingering(0, 1, 7)];
// // var w = x.countShiftingNumInN_Notes(fs, 3);
// // console.log(w);
