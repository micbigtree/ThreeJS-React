import React, { useState, useRef, useEffect } from "react";

import { a } from "react-spring/three";
import { useShapeStore } from "../zustand/shapes";
import { TransformControls } from "drei";
import * as THREE from 'three';
import "../App.scss";

const Shape = ({
  orbitControls,
  position,
  color,
  shape,
  speed,
  id,
  selected, 
  handleSelected
}) => {
  const [shapeSelected, setSelected] = useState(selected);
  const [hovered, setHover] = useState();
  const { updatePosition, currentArtboard } = useShapeStore();
  const worldPosition = new THREE.Vector3();
  const transformControls = useRef();
  const mesh = useRef();
  const handlePositionChange = () => {
  const controls = transformControls.current;

    updatePosition({ 
      id,
      currentArtboard,
      position: Object.values(controls.object.getWorldPosition(worldPosition)),
    });
  };

  const clickedShape = (id) => {
    handleSelected(id, position, color, shape);
  }

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      const callback = (event) => {
        orbitControls.current.enabled = !event.value;
        handlePositionChange();
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <TransformControls
      position={position}
      showY={selected === id ? true : false}
      showX={selected === id ? true : false}
      showZ={selected === id ? true : false}
      translationSnap={1}
      ref={transformControls}
    >
      
      <a.mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => clickedShape(id)}
        castShadow
        ref={mesh}
      >
        {shape === "box" ? (
          <boxBufferGeometry attach="geometry" />
        ) : shape === "cylinder" ? (
          <cylinderBufferGeometry attach="geometry" />
        ) : shape === "sphere" ? (
          <sphereBufferGeometry attach="geometry" />
        ) : (
          ""
        )}
        <meshStandardMaterial
          attach="material"
          color={color}
          speed={speed}
          factor={0.6}
          opacity={hovered ? 0.8 : 1}
        />
      </a.mesh>
    </TransformControls>
  );
};

const styles = {
htmlContainer: {
  position: "absolute",
}
};

export default Shape;
