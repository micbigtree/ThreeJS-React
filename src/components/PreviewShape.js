import React, { useState, useRef } from "react";

import { a } from "react-spring/three";
import { Select, Hover } from "@react-three/xr";
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
console.log(destination);
  return (
    <TransformControls
      position={position}
      showY={false}
      showX={false}
      showZ={false}
      translationSnap={1}
      ref={transformControls}
    >
      <Select
        onSelect={() => {
          if (destination !== "none") {
            updateArtboard(destination);
            updateCameraArtboard(destination);
          }
        }}
      >
        <a.mesh
          onPointerDown={() => {
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
      </Select>
    </TransformControls>
  );
};

export default PreviewShape;
