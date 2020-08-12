// To run:
// $ node app.js [IP] [username]

import { leapmotion } from './leap';
import { actions as hue, lightState } from './hue';
import { SwipeGesture, CircleGesture, Direction, Brightness, HueAction, Saturation, Light } from './model';
import { filter, groupBy, throttleTime, mergeMap, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

const throttleMs = 2000;

combineLatest(
    leapmotion.pipe(
        filter(event => event instanceof SwipeGesture),
        groupBy(event => event.direction),
        mergeMap(group$ => group$.pipe(throttleTime(throttleMs))),
        map(event => event as SwipeGesture),
    ),
    lightState.pipe(
        map(lights => lights as Array<Light>),
    )
).subscribe((x) => {
    const event = x[0] as SwipeGesture;
    const lights = x[1] as Array<Light>;
    const bri = lights[0].bri;
    const sat = lights[0].sat;
    const delta = 50;
    let action = null;

    switch (event.direction) {
        case Direction.Up:
            action = new Brightness(bri + delta);
            break;
        case Direction.Down:
            action = new Brightness(bri - delta);
            break;
        case Direction.Left:
            action = new Saturation(sat + delta);
            break;
        case Direction.Right:
            action = new Saturation(sat - delta);
            break;
    }

    if (action != null) {
        hue.next(action);
    }
});

leapmotion.pipe(
    filter(event => event instanceof CircleGesture),
    map(event => event as CircleGesture),
    throttleTime(throttleMs),
).subscribe(x => {
    console.log(x);
});
