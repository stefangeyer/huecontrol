import { HueAction, Light } from './model';
import { Subject } from 'rxjs';

export const actions: Subject<HueAction>;
export const lightState: Subject<Light[]>;
export const currentLightState: Light[];