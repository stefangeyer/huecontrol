# huecontrol

Control Philips Hue lights using a Leapmotion controller.

The aim of this project is to make use of the existing gestures that come with the [https://developer-archive.leapmotion.com/documentation/javascript/](Leapmotion SDK) and issue commands via Hue API to trigger different lighting effects.

As a prerequisite, the Leapmotion [https://developer.leapmotion.com/setup/deskop](V2 SDK) must be installed and running on the device. Data is transmitted via websocket.

As of now, the script will manage all of the lights registered at the Hue bridge, meaning that it is not possible to select a subset of lights that will be used. The script will also not create a Hue user and requires a username in order to work.

The script can be run using the following command:

```
ts-node src/app.ts <bridge-ip> <hue-user>
```