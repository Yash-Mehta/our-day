import { Svg, G, Path, Ellipse } from 'react-native-svg';
import { theme } from '../constants/theme';

interface Props {
  size?: number;
  color?: string;
  flip?: boolean;
}

export function Sprig({ size = 36, color = theme.colors.leaf, flip = false }: Props) {
  return (
    <Svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 60 36"
      style={flip ? { transform: [{ scaleX: -1 }] } : undefined}>
      <G stroke={color} strokeWidth={1} strokeLinecap="round" fill="none">
        <Path d="M2 18 Q 30 6, 58 18" />
        <Path d="M14 16 Q 12 10, 18 8" />
        <Path d="M22 13 Q 22 6, 28 6" />
        <Path d="M32 12 Q 34 5, 40 7" />
        <Path d="M44 14 Q 48 9, 52 12" />
        <Path d="M14 20 Q 12 26, 18 28" />
        <Path d="M24 21 Q 24 28, 30 28" />
        <Path d="M36 20 Q 38 27, 44 26" />
      </G>
      <G fill={color} fillOpacity={0.4}>
        <Ellipse cx={16} cy={11} rx={3} ry={1.5} rotation={-30} originX={16} originY={11} />
        <Ellipse cx={26} cy={9} rx={3} ry={1.5} rotation={-20} originX={26} originY={9} />
        <Ellipse cx={38} cy={9} rx={3} ry={1.5} rotation={20} originX={38} originY={9} />
        <Ellipse cx={48} cy={11} rx={3} ry={1.5} rotation={30} originX={48} originY={11} />
        <Ellipse cx={16} cy={25} rx={3} ry={1.5} rotation={30} originX={16} originY={25} />
        <Ellipse cx={28} cy={27} rx={3} ry={1.5} rotation={20} originX={28} originY={27} />
        <Ellipse cx={40} cy={25} rx={3} ry={1.5} rotation={-20} originX={40} originY={25} />
      </G>
    </Svg>
  );
}
