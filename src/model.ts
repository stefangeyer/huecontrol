export class LeapmotionEvent {
}

export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export class SwipeEvent extends LeapmotionEvent {
    direction: Direction;
    directionX: Number;
    directionY: Number;

    constructor(direction: Direction, directionX: Number, directionY: Number) {
        super();
        this.direction = direction;
        this.directionX = directionX;
        this.directionY = directionY;
    }
}
