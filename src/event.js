import Cylon from 'cylon';
import { Observable } from 'rxjs';
import { Direction, SwipeGesture, CircleGesture, KeyTapGesture, ScreenTapGesture } from './model';


export const leapmotion = new Observable(subscriber => {
    Cylon.robot({
        name: "leapbot",

        connections: {
            leapmotion: { adaptor: "leapmotion" }
        },

        devices: {
            leapmotion: { driver: "leapmotion" }
        },

        work: (my) => {
            my.leapmotion.on("gesture", (gesture, frame) => {
                let event = null;
                const id = gesture.id;
                const duration = gesture.duration;

                switch (gesture.type) {
                    case "circle":
                        event = new CircleGesture(id, duration);
                        break;
                    case "keyTap":
                        event = new KeyTapGesture(id, duration);
                        break;
                    case "screenTap":
                        event = new ScreenTapGesture(id, duration);
                        break;
                    case "swipe":
                        // Classify swipe as either horizontal or vertical
                        const directionX = gesture.direction[0];
                        const directionY = gesture.direction[1];
                        const horizontal = Math.abs(directionX) > Math.abs(directionY);
                        let direction = null;
                        // Classify as right-left or up-down
                        if (horizontal) {
                            if (gesture.direction[0] > 0) {
                                direction = Direction.Right;
                            } else {
                                direction = Direction.Left;
                            }
                        } else {
                            if (gesture.direction[1] > 0) {
                                direction = Direction.Up;
                            } else {
                                direction = Direction.Down;
                            }
                        }
                        event = new SwipeGesture(id, duration, direction, directionX, directionY);
                        break;
                }

                if (event != null) {
                    subscriber.next(event);
                }
            })
        }
    }).start();
});

