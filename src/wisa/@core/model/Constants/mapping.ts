export const CHANNELS = {
  pitch_deviation: {
    value: 'pitch_deviation',
    label: {
      de: 'Pitchabweichung',
      en: 'Pitch deviation'
    },
    unit: {
      de: 'Status',
      en: 'state'
    },
    features: [
      'CDI.VA_PitchPositionBlade1',
      'CDI.VA_PitchPositionBlade2',
      'CDI.VA_PitchPositionBlade3'
    ]
  },
  'CDI.VA_PitchPositionBlade1': {
    value: 'CDI.VA_PitchPositionBlade1',
    label: {
      de: 'Position Rotor 1',
      en: 'PitchPositionBlade1'
    },
    unit: {
      de: '°',
      en: '°'
    }
  },
  'CDI.VA_PitchPositionBlade2': {
    value: 'CDI.VA_PitchPositionBlade2',
    label: {
      de: 'Position Rotor 2',
      en: 'PitchPositionBlade2'
    },
    unit: {
      de: '°',
      en: '°'
    }
  },
  'CDI.VA_PitchPositionBlade3': {
    value: 'CDI.VA_PitchPositionBlade3',
    label: {
      de: 'Position Rotor 3',
      en: 'PitchPositionBlade3'
    },
    unit: {
      de: '°',
      en: '°'
    }
  },
  WindSpeed: {
    value: 'WindSpeed',
    label: {
      de: 'Windgeschwindigkeit',
      en: 'Windspeed'
    },
    unit: {
      de: 'm/s',
      en: 'm/s'
    },
  },
  ActivePower: {
    value: 'ActivePower',
    label: {
      de: 'Stromerzeugung',
      en: 'Active power'
    },
    unit: {
      de: 'kW/std',
      en: 'kW/h'
    },
  },
  RotorRPM: {
    value: 'RotorRPM',
    label: {
      de: 'Rotordrehzahl',
      en: 'Rotor speed'
    },
    unit: {
      de: 'U/min',
      en: 'rpm'
    },
  },
  GeneratorRPM: {
    value: 'GeneratorRPM',
    label: {
      de: 'Generatordrehzahl',
      en: 'Generator speed'
    },
    unit: {
      de: 'U/min',
      en: 'rpm'
    },

  }
};
