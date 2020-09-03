import React from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";

const CubeMesh = (props) => {
  return (
    <a.mesh
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
        opacity={0.8}
      />
    </a.mesh>
  );
};

export default CubeMesh;
