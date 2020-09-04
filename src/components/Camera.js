import React from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";
import Transformable from "./Transformable.js";

const Camera = (props) => {
  return (
    <Transformable showY={false} orbitControls={props.orbitControls}>
      <a.mesh
        castShadow
        onClick={(event) => {
          let vector = new THREE.Vector3();
          event.object.getWorldPosition(vector);
          console.log(vector.position);
        }}
      >
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color="black"
          factor={0.6}
          opacity={0.8}
        />
      </a.mesh>
    </Transformable>
  );
};

export default Camera;
