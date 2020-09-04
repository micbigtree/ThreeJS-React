import React, { useState, useEffect } from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";
import Transformable from "./Transformable.js";

const Camera = (props) => {
  const [hovered, setHover] = useState(false);

  let vector = new THREE.Vector3();

  useEffect(() => {});

  return (
    <Transformable
      showX={hovered}
      showY={false}
      showZ={hovered}
      orbitControls={props.orbitControls}
    >
      <a.mesh
        castShadow
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        onClick={(event) => {
          event.object.getWorldPosition(vector);
          console.log(vector);
          console.log(Object.values(vector));
        }}
      >
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color="black"
          factor={0.6}
          opacity={hovered ? 0.8 : 1}
        />
      </a.mesh>
    </Transformable>
  );
};

export default Camera;
