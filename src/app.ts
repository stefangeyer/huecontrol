// To run:
// $ node app.ts [IP] [username]

import { leapmotion } from './leap';
import { actions as hue, lightState } from './hue';
import { SwipeGesture, CircleGesture, Direction, Brightness, HueAction, Saturation, Light, LeapmotionEvent, Gesture } from './model';
import { filter, groupBy, throttleTime, mergeMap, map, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest, GroupedObservable, Observable, ObservableInput } from 'rxjs';

const throttleMs = 500;

combineLatest<Observable<any>, [SwipeGesture, Light[]]>(
    leapmotion.pipe(
        filter((event: LeapmotionEvent) => event instanceof SwipeGesture),
        map((event: LeapmotionEvent) => event as SwipeGesture),
        groupBy((gesture: SwipeGesture) => gesture.direction),
        mergeMap((group$: GroupedObservable<Direction, SwipeGesture>) =>
            group$.pipe(
                throttleTime(throttleMs),
            )
        ),
    ),
    lightState.pipe(
        distinctUntilChanged(),
    )
).subscribe(([gesture, lights]: [SwipeGesture, Light[]]) => {
    console.log(gesture);
    const bri = lights[0].bri;
    const sat = lights[0].sat;
    const delta = 50;
    let action = null;

    switch (gesture.direction) {
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
