import React, { useState, useRef, useEffect } from "react";
import { useGLTFLoader, TransformControls } from "drei";

const Model = ({orbitControls}) => {
    const gltf = useGLTFLoader("/pirates/ship_light.gltf", true);
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
        showY={true}
        showX={true}
        showZ={true}
        translationSnap={1}
        ref={transformControls}
      >
        <group position={[0, 0, 0]}>
          <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
            <primitive object={gltf.scene} dispose={null} />
          </mesh>
        </group>
      </TransformControls>
    );
}

export default Model;