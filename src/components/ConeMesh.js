import React, { useRef } from "react";
import "../App.scss";

import { a } from "react-spring/three";

const CubeMesh = (props) => {
  const mesh = useRef(null);
  return (
    <a.mesh castShadow position={props.position} ref={mesh}>
      <coneBufferGeometry attach="geometry" args={props.args} />
      <meshStandardMaterial
        attach="material"
        color={props.color}
        speed={props.speed}
        factor={0.6}
      />
    </a.mesh>
  );
};

export default CubeMesh;
