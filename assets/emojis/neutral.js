import * as React from "react";
import Svg, { Circle, Path, G } from "react-native-svg";

const NeutralEmoji = (props) => (
  <Svg width={96} height={96} viewBox="0 0 64 64" {...props}>
    <Circle cx={32} cy={32} r={30} fill="#FFDD67" />
    <G fill="#664E27">
      <Path d="M44.7 40.2H19.3c-1.1 0-1.1 1.5 0 1.5h25.4c1.1 0 1.1-1.5 0-1.5z" />
      <Path d="M29.8 29.2c0 3.2-2.3 5.8-5.2 5.8s-5.2-2.6-5.2-5.8c0-3.2 2.3-5.8 5.2-5.8s5.2 2.6 5.2 5.8" />
      <Path d="M44.6 29.2c0 3.2-2.3 5.8-5.2 5.8s-5.2-2.6-5.2-5.8c0-3.2 2.3-5.8 5.2-5.8s5.2 2.6 5.2 5.8" />
    </G>
  </Svg>
);

export default NeutralEmoji; 