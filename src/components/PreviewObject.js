import React, { useState, useRef } from "react";

import { a } from "react-spring/three";
import { Select } from "@react-three/xr";
import { useObjectStore } from "../zustand/objects";
import { useCameraStore } from "../zustand/camera";
import { useGLTFLoader, TransformControls } from "@react-three/drei";

import "../App.scss";

const PreviewObject = ({
  orbitControls,
  object,
  category,
  position,
  rotation,
  scale,
  id,
  destination
}) => {
  const [hovered, setHover] = useState(false);

  const {} = useObjectStore();
  const { updateCameraArtboard } = useCameraStore();

  const gltf = useGLTFLoader("/" + category + "/" + object + ".gltf", true);
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
      {/* <Select
        onSelect={() => {
          if (destination !== "none") {
            updateArtboard(destination);
            updateCameraArtboard(destination);
          }
        }}
      > */}
      <group position={position}>
        <mesh
          // onPointerDown={() => clickedShape(id)}
          attach="material"
          receiveShadow
          scale={scale}
        >
          <primitive object={gltf.scene} dispose={null} />
        </mesh>
      </group>
      {/* </Select> */}
    </TransformControls>
  );
};

export default PreviewObject;
