// To run:
// $ node app.js [IP] [username]

import { leapmotion } from "./event";
import { bulbs } from "./hue";
import { LeapmotionEvent } from "./model";

leapmotion.subscribe((event: LeapmotionEvent) => {
    console.log(event);
});