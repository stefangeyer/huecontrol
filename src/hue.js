import Cylon from 'cylon';


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

export const bulbs = Cylon.MCP.robots.huebot.devices;