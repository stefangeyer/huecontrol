// To run:
// $ node app.ts [IP] [username]

import { leapmotion } from './leap';
import { actions as hue, lightState, currentLightState } from './hue';
import { SwipeGesture, CircleGesture, Direction, Brightness, Light, LeapmotionEvent, RandomColor } from './model';
import { filter, groupBy, throttleTime, mergeMap, map, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { combineLatest, GroupedObservable, Observable } from 'rxjs';

combineLatest<Observable<any>, [[SwipeGesture, number], Light[]]>(
    leapmotion.pipe(
        filter((event: LeapmotionEvent) => event instanceof SwipeGesture),
        map((event: LeapmotionEvent) => event as SwipeGesture),
        groupBy((gesture: SwipeGesture) => gesture.direction),
        mergeMap((group$: GroupedObservable<Direction, SwipeGesture>) => {
            let count = 1;
            return group$.pipe(
                map(gesture => [gesture, count++]),
                debounceTime(100),
                tap(_ => count = 1),
            )
        }),
    ),
    lightState.pipe(
        distinctUntilChanged(),
    )
).subscribe(([gestures, lights]: [[SwipeGesture, number], Light[]]) => {
    console.log(gestures);
    const [gesture, count] = gestures;
    const bri = currentLightState[0].bri;
    const delta = 50 + count; // TODO change?
    let action = null;

    switch (gesture.direction) {
        case Direction.Up:
            action = new Brightness(bri + delta);
            break;
        case Direction.Down:
            action = new Brightness(bri - delta);
            break;
        case Direction.Left:
            break;
        case Direction.Right:
            break;
    }

    if (action != null) {
        hue.next(action);
    }
});

leapmotion.pipe(
    filter(event => event instanceof CircleGesture),
    map(event => event as CircleGesture),
    filter(gesture => gesture.duration > 50000),
    throttleTime(500),
).subscribe(gesture => {
    console.log(gesture);
    hue.next(new RandomColor());
});
