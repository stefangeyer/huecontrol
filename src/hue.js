import Cylon from 'cylon';
import { Subject } from 'rxjs';
import { Brightness, Saturation, Light } from './model'
import { map, filter } from 'rxjs/operators';

export const actions = new Subject();
export const lightState = new Subject();

const delayMs = 50;

const fetchState = (hue) => {
    hue.getFullState((err, config) => {
        if (err != null) {
            console.log("Could not fetch state " + err);
            return;
        }
        const lightData = config.lights;
        const lights = []
        for (const [id, data] of Object.entries(lightData)) {
            const state = data.state;
            const light = new Light(
                id, state.bri, state.colormode, state.ct,
                state.effect, state.hue, state.mode, state.on,
                state.reachable, state.sat, state.xy);
            lights.push(light);
        }
        lightState.next(lights);
        console.log(lights);
    })
}

const forEachBulb = (devices, callback) => {
    for (const bulbId in devices) {
        const bulb = devices[bulbId];
        callback(bulb);
    }
}

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
        // fetch initial state
        fetchState(my.hue);

        // TODO handle this differently
        forEachBulb(my.devices, (bulb) => {
            bulb.turnOn();
        });

        // process actions
        actions.pipe(
            filter(action => action instanceof Brightness),
            map(action => action.value),
            map(brightness => Math.max(0, brightness)),
            map(brightness => Math.max(brightness, 100)),
        ).subscribe(brightness => {
            forEachBulb(my.devices, (bulb) => {
                bulb.brightness(brightness);
            });
        });

        actions.pipe(
            filter(action => action instanceof Saturation),
            map(action => action.value),
            map(saturation => Math.max(0, saturation)),
            map(saturation => Math.max(saturation, 100)),
        ).subscribe(saturation => {
            forEachBulb(my.devices, (bulb) => {
                // bulb.saturation(saturation);
            });
        });
    }
}).start();