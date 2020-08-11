// To run:
// $ node index.js [IP] [username]

"use strict";

import Cylon from 'cylon';

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
            if (gesture.type == "swipe") {
                // Classify swipe as either horizontal or vertical
                const horizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                let swipeDirection = "";
                //Classify as right-left or up-down
                if (horizontal) {
                    if (gesture.direction[0] > 0) {
                        swipeDirection = "right";
                    } else {
                        swipeDirection = "left";
                    }
                } else { //vertical
                    if (gesture.direction[1] > 0) {
                        swipeDirection = "up";
                        // TODO throttle / debounce
                        Cylon.bulb1.brightness(100);
                    } else {
                        swipeDirection = "down";
                        Cylon.bulb1.brightness(0);
                    }
                }
                console.log(swipeDirection);
            }

            // console.log(gesture.toString());
        })
    }
}).start();

Cylon.robot({
    name: "huebot",

    connections: {
        hue: { adaptor: 'hue', host: process.argv[2], username: process.argv[3] }
    },

    devices: {
        bulb1: { driver: 'hue-light', lightId: 1 },
        bulb2: { driver: 'hue-light', lightId: 2 },
        bulb3: { driver: 'hue-light', lightId: 3 }
    },

    work: (my) => {
    }
}).start();

Cylon.bulb1 = Cylon.MCP.robots.huebot.devices.bulb1;
Cylon.bulb2 = Cylon.MCP.robots.huebot.devices.bulb2;
Cylon.bulb3 = Cylon.MCP.robots.huebot.devices.bulb3;