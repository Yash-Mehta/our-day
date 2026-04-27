import { Svg, G, Path, Text as SvgText } from 'react-native-svg';
import { theme } from '../constants/theme';

interface Props {
  size?: number;
  color?: string;
}

export function MonogramSeal({ size = 64, color = theme.colors.accent }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80">
      <G stroke={color} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.85}>
        <Path d="M14 40 C 14 22, 22 12, 40 10" />
        <Path d="M18 32 C 16 30, 14 30, 12 32 C 14 34, 16 34, 18 32 Z" />
        <Path d="M16 24 C 14 22, 12 22, 10 24 C 12 26, 14 26, 16 24 Z" />
        <Path d="M20 18 C 18 16, 16 16, 14 18 C 16 20, 18 20, 20 18 Z" />
        <Path d="M28 12 C 26 10, 24 10, 22 12 C 24 14, 26 14, 28 12 Z" />
        <Path d="M66 40 C 66 22, 58 12, 40 10" />
        <Path d="M62 32 C 64 30, 66 30, 68 32 C 66 34, 64 34, 62 32 Z" />
        <Path d="M64 24 C 66 22, 68 22, 70 24 C 68 26, 66 26, 64 24 Z" />
        <Path d="M60 18 C 62 16, 64 16, 66 18 C 64 20, 62 20, 60 18 Z" />
        <Path d="M52 12 C 54 10, 56 10, 58 12 C 56 14, 54 14, 52 12 Z" />
        <Path d="M14 40 C 14 58, 22 68, 40 70" />
        <Path d="M18 48 C 16 50, 14 50, 12 48 C 14 46, 16 46, 18 48 Z" />
        <Path d="M16 56 C 14 58, 12 58, 10 56 C 12 54, 14 54, 16 56 Z" />
        <Path d="M22 64 C 20 64, 18 64, 16 62 C 18 60, 20 60, 22 62 Z" />
        <Path d="M28 68 C 26 68, 24 68, 22 66 C 24 66, 26 66, 28 68 Z" />
        <Path d="M66 40 C 66 58, 58 68, 40 70" />
        <Path d="M62 48 C 64 50, 66 50, 68 48 C 66 46, 64 46, 62 48 Z" />
        <Path d="M64 56 C 66 58, 68 58, 70 56 C 68 54, 66 54, 64 56 Z" />
        <Path d="M58 64 C 60 64, 62 64, 64 62 C 62 60, 60 60, 58 62 Z" />
        <Path d="M52 68 C 54 68, 56 68, 58 66 C 56 66, 54 66, 52 68 Z" />
      </G>
      <SvgText
        x="40"
        y="50"
        textAnchor="middle"
        fontFamily={theme.fonts.serifItalic}
        fontSize={28}
        fontStyle="italic"
        fontWeight="500"
        fill={color}>
        Y&amp;V
      </SvgText>
    </Svg>
  );
}
