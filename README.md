# huecontrol

Control Philips Hue lights using a Leapmotion controller.


The aim of this project is to make use of the existing gestures that come with the Leapmotion SDK ([docs](https://developer-archive.leapmotion.com/documentation/javascript/)) and issue commands via Hue API to trigger different lighting effects. As a prerequisite, the [Leapmotion V2 SDK](https://developer.leapmotion.com/setup/deskop) must be installed and running on the device. Data transmission happens via websockets.

As of now, the script will manage all of the lights registered at the Hue bridge, meaning that it is not possible to select a subset of lights that will be used. The script will also not create a Hue user and requires a username in order to work.

The script can be run using the following command:

```sh
ts-node src/app.ts <bridge-ip> <hue-user>
```
