import { Platform } from 'react-native';

export const theme = {
  colors: {
    // Backgrounds
    bg: '#FAF6F1',
    card: '#FFFFFF',
    surface2: '#F4ECE2',
    surface3: '#EADFD0',
    line: 'rgba(122, 74, 63, 0.14)',
    lineStrong: 'rgba(122, 74, 63, 0.22)',

    // Ink (text)
    ink: '#2A1D17',
    ink2: '#5C463C',
    ink3: '#8C7064',
    ink4: '#B59E91',

    // Brand
    accent: '#7A4A3F',
    accentDeep: '#5C3329',
    accentSoft: '#C58A7A',
    accentTint: '#F1DFD6',

    // Nature palette (tropical garden)
    leaf: '#4A6B4A',
    leafSoft: '#B7C4A8',
    sand: '#E8D9BE',
    sky: '#A9C6D1',

    // Status
    heart: '#B43A3A',

    // Countdown banner gradient
    countdownStart: '#5C3329',
    countdownEnd: '#7A4A3F',
  },

  fonts: {
    serif: Platform.select({
      ios: 'CormorantGaramond-Medium',
      android: 'CormorantGaramond-Medium',
      default: 'Georgia',
    }),
    serifItalic: Platform.select({
      ios: 'CormorantGaramond-Italic',
      android: 'CormorantGaramond-Italic',
      default: 'Georgia',
    }),
    serifMediumItalic: Platform.select({
      ios: 'CormorantGaramond-MediumItalic',
      android: 'CormorantGaramond-MediumItalic',
      default: 'Georgia',
    }),
    sans: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  },

  radii: {
    sm: 8,
    md: 14,
    lg: 22,
    xl: 28,
    pill: 9999,
  },

  shadows: {
    s1: {
      shadowColor: '#3C1E14',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    s2: {
      shadowColor: '#3C1E14',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 4,
    },
    s3: {
      shadowColor: '#3C1E14',
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.18,
      shadowRadius: 40,
      elevation: 12,
    },
  },
};
