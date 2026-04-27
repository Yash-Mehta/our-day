import { View } from 'react-native';
import { Sprig } from './Sprig';
import { theme } from '../constants/theme';

interface Props {
  color?: string;
}

export function SprigDivider({ color = theme.colors.accent }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ flex: 1, height: 0.5, backgroundColor: theme.colors.accentSoft, opacity: 0.4 }} />
      <Sprig size={24} color={color} />
      <View style={{ flex: 1, height: 0.5, backgroundColor: theme.colors.accentSoft, opacity: 0.4 }} />
    </View>
  );
}
