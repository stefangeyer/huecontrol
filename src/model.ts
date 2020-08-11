export abstract class Gesture {
    id: Number;
    duration: Number;
    
    constructor(id: Number, duration: Number) {
        this.id = id;
        this.duration = duration;
    }
}

export enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

export class SwipeGesture extends Gesture {
    direction: Direction;
    deltaX: Number;
    deltaY: Number;

    constructor(id: Number, duration: Number, direction: Direction, deltaX: Number, deltaY: Number) {
        super(id, duration);
        this.direction = direction;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
}

export class CircleGesture extends Gesture {

}

export class ScreenTapGesture extends Gesture {

}

export class KeyTapGesture extends Gesture {

}