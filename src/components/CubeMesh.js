import React, { useState } from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";
import Transformable from "./Transformable.js";

const CubeMesh = (props) => {
  const [hovered, setHover] = useState(false);

  return (
    <Transformable showY={true} orbitControls={props.orbitControls}>
      <a.mesh
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        castShadow
        onClick={(event) => {
          let vector = new THREE.Vector3();
          event.object.getWorldPosition(vector);
          console.log(vector);
        }}
      >
        {props.shape === "box" ? (
          <boxBufferGeometry attach="geometry" args={props.args} />
        ) : props.shape === "cylinder" ? (
          <cylinderBufferGeometry attach="geometry" args={props.args} />
        ) : props.shape === "sphere" ? (
          <sphereBufferGeometry attach="geometry" args={props.args} />
        ) : (
          <coneBufferGeometry attach="geometry" args={props.args} />
        )}
        <meshStandardMaterial
          attach="material"
          color={props.color}
          speed={props.speed}
          factor={0.6}
          opacity={hovered ? 0.8 : 1}
        />
      </a.mesh>
    </Transformable>
  );
};

export default CubeMesh;
