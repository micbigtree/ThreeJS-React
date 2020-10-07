import React, { useState, useRef } from "react";

import { a } from "react-spring/three";
import { useShapeStore } from "../zustand/shapes";
import { useCameraStore } from "../zustand/camera";
import { TransformControls } from "drei";

import "../App.scss";

const PreviewShape = ({
  position,
  color,
  shape,
  speed,
  destination,
}) => {
  const [hovered, setHover] = useState(false);

  const { updateArtboard } = useShapeStore();
  const { updateCameraArtboard } = useCameraStore();

  const transformControls = useRef();

  return (
    <TransformControls
      position={position}
      showY={false}
      showX={false}
      showZ={false}
      translationSnap={1}
      ref={transformControls}
    >
      <a.mesh
        onClick={() => {
          if (destination !== "none") {
            updateArtboard(destination);
            updateCameraArtboard(destination);
          }
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        castShadow
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

export default PreviewShape;
