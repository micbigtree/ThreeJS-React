import React, { useState, useRef } from "react";

import { a } from "react-spring/three";
import { Select } from "@react-three/xr";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useObjectStore } from "../zustand/objects";
import { useCameraStore } from "../zustand/camera";
import { TransformControls } from "@react-three/drei";

import "../App.scss";

const PreviewObject = ({
  orbitControls,
  object,
  category,
  position,
  rotation,
  scale,
  id,
  destination,
  url
}) => {
  const [hovered, setHover] = useState(false);
  const gltf = useLoader(GLTFLoader, url);

  const {} = useObjectStore();
  const { updateCameraArtboard } = useCameraStore();

  // const transformControls = useRef();
  console.log(destination);
  return (
    <group position={position}>
      <mesh
        attach="material"
        receiveShadow
        scale={scale}
        // onPointerDown={() => clickedShape(id)}
      >
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </group>
  );
  // NEED TO SORT OUT THE BELOW MESS. THERE'S SOME
  // USEFUL STUFF IN THERE
  // return (
  // <TransformControls
  //   position={position}
  //   showY={false}
  //   showX={false}
  //   showZ={false}
  //   translationSnap={1}
  //   ref={transformControls}
  // >
  {
    /* <Select
        onSelect={() => {
          if (destination !== "none") {
            updateArtboard(destination);
            updateCameraArtboard(destination);
          }
        }}
      > */
  }
  // <group position={position}>
  // <mesh
  //   attach="material"
  //   receiveShadow
  //   scale={scale}
  //   // onPointerDown={() => clickedShape(id)}
  // >
  //   <primitive object={gltf.scene} dispose={null} />
  // </mesh>
  // </group>
  {
    /* </Select> */
  }
  // </TransformControls>
  // );
};

export default PreviewObject;
