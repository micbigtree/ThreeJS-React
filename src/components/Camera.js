import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import "../App.scss";

import { a } from "react-spring/three";
import { TransformControls } from "drei";
import { useCameraStore } from "../zustand/camera";
import { useShapeStore } from "../zustand/shapes";

const Camera = ({ orbitControls, selected, handleSelected }) => {
  const [hovered, setHovered] = useState(false);

  const id = -1

  const { updateCameraPosition, cameraArtboards } = useCameraStore();
  const { currentArtboard } = useShapeStore();

  const worldPosition = new THREE.Vector3();

  const handlePositionChange = () => {
    const controls = transformControls.current;
    updateCameraPosition({
      currentArtboard,
      position: Object.values(controls.object.getWorldPosition(worldPosition)),
    });
  };

  const transformControls = useRef();
  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      const callback = (event) => {
        orbitControls.current.enabled = !event.value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <TransformControls
      position={cameraArtboards[currentArtboard].position}
      showY={selected === id ? true : false}
      showX={selected === id ? true : false}
      showZ={selected === id ? true : false}
      translationSnap={1}
      ref={transformControls}
      onPointerUp={() => handlePositionChange()}
    >
      <a.mesh
        scale={[0.25, 0.25, 0.25]}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => handleSelected(id)}
      >
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color="black"
          factor={0.6}
          opacity={hovered ? 0.8 : 1}
        />
      </a.mesh>
    </TransformControls>
  );
};

export default Camera;
