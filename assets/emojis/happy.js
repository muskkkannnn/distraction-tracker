import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const HappyEmoji = (props) => (
  <Svg width={96} height={96} viewBox="0 0 64 64" {...props}>
    <Circle cx={32} cy={32} r={30} fill="#FFDD67" />
    <Path
      d="M47 36c-5.1 9.7-18.9 9.8-24 0-1.2-2.3.5-5 .5-5 5 6.7 17.9 6.7 23 0 0 0 1.7 2.7.5 5z"
      fill="#664E27"
    />
    <Path
      d="M29.1 30.6c-1.8-4.9-10.1-3.7-10.1.7 0 3.8 7.5 3.7 10.1-.7"
      fill="#664E27"
    />
    <Path
      d="M45 31.3c1.8-4.9 10.1-3.7 10.1.7 0 3.8-7.5 3.7-10.1-.7"
      fill="#664E27"
    />
  </Svg>
)

export default HappyEmoji; 