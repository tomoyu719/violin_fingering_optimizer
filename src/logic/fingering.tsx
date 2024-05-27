export class Fingering {
    //  if violin, G: ,
    stringOrder: number;
    // finger number, 0: open-string, 1: index, 2: middle, 3: ring, 4: pinky
    finger: number;
    position: number;
    constructor(stringOrder: number, finger: number, position: number) {
        this.stringOrder = stringOrder;
        this.finger = finger;
        this.position = position;
    }

    equals(other: Fingering) {
        return other.stringOrder === this.stringOrder && other.finger === this.finger && other.position === this.position;
    }
    toString() {
        return 'Fingering(' + this.stringOrder.toString() + ', ' + this.finger.toString() + ', ' + this.position.toString() + ')';
    }
}   
