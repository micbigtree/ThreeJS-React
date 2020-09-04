import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";
import { TransformControls } from "drei";
const CubeMesh = (props) => {
  const [hovered, setHover] = useState(false);

  let vector = new THREE.Vector3();

  const transformControls = useRef();

  const [objectPosition, setObjectPosition] = useState([0, 0, 0]);

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      const callback = (event) =>
        (props.orbitControls.current.enabled = !event.value);
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  const recordPositionChange = (e) => {
    e.object.getWorldPosition(vector);
    // setObjectPosition(Object.values(vector));
    props.setSidebarPosition(Object.values(vector));
    console.log(Object.values(vector));
  };

  return (
    <TransformControls
      onClick={(e) => {
        recordPositionChange(e);
      }}
      position={objectPosition}
      showY={hovered}
      showX={hovered}
      showZ={hovered}
      translationSnap={1}
      ref={transformControls}
    >
      <a.mesh
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        castShadow
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
    </TransformControls>
  );
};

export default CubeMesh;
