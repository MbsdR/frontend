import {GRAPHICS} from '../../utility/content-creator/constant';

export const FREQUENCY = [1, 3, 5, 10];
export const UNITS = {
  sec: {value: 's', label: {de: 'sek.', en: 'sec.'}},
  min: {value: 'm', label: {de: 'min.', en: 'min'}},
  hour: {value: 'h', label: {de: 'std.', en: 'h'}}
};

export const TYPECHARTS: Array<string> = Object.keys(GRAPHICS);
