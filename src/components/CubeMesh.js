import React, { useState, useRef, useEffect } from "react";

import { a } from "react-spring/three";
import { useZusStore } from "../zustand/artboards";
import { TransformControls } from "drei";
import * as THREE from 'three';

import "../App.scss";

const CubeMesh = ({
  orbitControls,
  position,
  color,
  shape,
  speed,
  id,
}) => {
  const [hovered, setHover] = useState(false);

  const { updatePosition, currentArtboard } = useZusStore();

  const worldPosition = new THREE.Vector3(0, 0, 0);
  const transformControls = useRef();
  const mesh = useRef();

useEffect(() => {
  if (transformControls.current.dragging) {
    updatePosition({
      id,
      currentArtboard,
      position: Object.values(
        transformControls.current.object.getWorldPosition(worldPosition)
      ),
    });
    // updatePosition({position: Object.values(
    //     transformControls.current.object.getWorldPosition(worldPosition)
    //   )})
  }
});

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
        controls.object.getWorldPosition(worldPosition);
      const callback = (event) =>
        (orbitControls.current.enabled = !event.value);
      controls.addEventListener("dragging-changed", callback, {passive: true});

      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
      <TransformControls
        position={position}
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

export default CubeMesh;
