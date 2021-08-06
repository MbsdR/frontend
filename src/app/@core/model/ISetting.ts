export const FREQUENCE = [1, 3, 5, 10];
export const UNITS = {
  sec: {value: 's', label: {de: 'sek.', en: 'sec.'}},
  min: {value: 'm', label: {de: 'min.', en: 'min'}},
  hour: {value: 'h', label: {de: 'std.', en: 'h'}}
};

export interface ISetting {
  channel: string;
  turbine: string;
  func: string;
  frequence: { value: number, unit: string };
  type: string;
}
