// LeapMotion

import { groupBy } from "rxjs/operators";

export interface LeapmotionEvent {
}

export abstract class Gesture implements LeapmotionEvent {
    id: number;
    duration: number;

    constructor(id: number, duration: number) {
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
    deltaX: number;
    deltaY: number;

    constructor(id: number, duration: number, direction: Direction, deltaX: number, deltaY: number) {
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

// Hue

export interface HueAction {
}

export class Brightness implements HueAction {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    percentage() {
        let value = Math.max(1, Math.min(254, this.value));
        return (value / 254) * 100;
    }
}

export class Color implements HueAction {
    red: number;
    blue: number;
    green: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

export class RandomColor extends Color {
    constructor() {
        super(
            RandomColor.randomNumber(),
            RandomColor.randomNumber(),
            RandomColor.randomNumber()
        );
    }

    static randomNumber() {
        return Math.floor(Math.random() * 255);
    }
}

export class Light {
    id: number;
    bri: number;
    colormode: string;
    ct: number;
    effect: string;
    hue: number;
    mode: string;
    on: boolean;
    reachable: boolean;
    sat: number;
    xy: Array<number>;
    constructor(
        id: number, bri: number, colormode: string, ct: number,
        effect: string, hue: number, mode: string, on: boolean,
        reachable: boolean, sat: number, xy: Array<number>) {
        this.id = id;
        this.bri = bri;
        this.colormode = colormode;
        this.ct = ct;
        this.effect = effect;
        this.hue = hue;
        this.mode = mode;
        this.on = on;
        this.reachable = reachable;
        this.sat = sat;
        this.xy = xy;
    }
}