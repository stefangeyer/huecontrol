// To run:
// $ node app.js [IP] [username]

import { leapmotion } from "./event";
import { bulbs } from "./hue";
import { Gesture, SwipeGesture, CircleGesture } from "./model";
import { filter, groupBy, throttleTime, mergeMap } from 'rxjs/operators';

leapmotion.subscribe((event: Gesture) => {
    // console.log(event);
});

leapmotion.pipe(
    filter(event => event instanceof SwipeGesture),
    groupBy((event: SwipeGesture) => event.direction),
    mergeMap((group$) => group$.pipe(throttleTime(100))),
).subscribe(x => {
    console.log(x);
});

leapmotion.pipe(
    filter(event => event instanceof CircleGesture),
    groupBy((event: CircleGesture) => event.id),
    mergeMap((group$) => group$.pipe(throttleTime(100))),
).subscribe(x => {
    console.log(x);
});