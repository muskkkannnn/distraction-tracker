import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ConcernedEmoji = (props) => (
  <Svg width={96} height={96} viewBox="0 0 64 64" {...props}>
    <Circle cx={32} cy={32} r={30} fill="#FFDD67" />
    <Path
      d="M33.5 40.8c-6.5 0-9.3-2.8-9.7-3.2-.8-.8-.8-2.1 0-2.8.8-.8 2.1-.8 2.8 0 .1.1 2 1.8 6.9 1.8 4.8 0 6.8-1.7 6.9-1.8.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8-.4.4-3.2 3.2-9.7 3.2z"
      fill="#664E27"
    />
    <Path
      d="M27.9 29.8c0 3.2-2.3 5.8-5.2 5.8s-5.2-2.6-5.2-5.8c0-3.2 2.3-5.8 5.2-5.8s5.2 2.6 5.2 5.8M46.5 29.8c0 3.2-2.3 5.8-5.2 5.8s-5.2-2.6-5.2-5.8c0-3.2 2.3-5.8 5.2-5.8s5.2 2.6 5.2 5.8"
      fill="#664E27"
    />
  </Svg>
);

export default ConcernedEmoji; 