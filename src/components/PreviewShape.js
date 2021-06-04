import React, { useState, useRef } from "react";

import { a } from "react-spring/three";
import { Interactive } from "@react-three/xr";
import { useObjectStore } from "../zustand/objects";
import { useCameraStore } from "../zustand/camera";
import { TransformControls } from "drei";

import "../App.scss";

const PreviewShape = ({ position, color, shape, speed, destination }) => {
  const [hovered, setHover] = useState(false);

  const { updateObjectArtboard } = useObjectStore();
  const { updateCameraArtboard } = useCameraStore();

  const transformControls = useRef();
  console.log(destination);
  return (
    // <TransformControls
    //   // position={position}
    //   showY={false}
    //   showX={false}
    //   showZ={false}
    //   translationSnap={1}
    //   // ref={transformControls}
    // >
    <Interactive
      onSelect={() => {
        if (destination !== "") {
          updateObjectArtboard(destination);
          updateCameraArtboard(destination);
        }
      }}
    >
      <a.mesh
        onPointerDown={() => {
          if (destination !== "none") {
            updateObjectArtboard(destination);
            updateCameraArtboard(destination);
          }
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        castShadow
        ref={transformControls}
        position={position}
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
    </Interactive>
    // </TransformControls>
  );
};

export default PreviewShape;
