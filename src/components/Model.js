import React, { useRef, useEffect } from "react";
import { useGLTFLoader, TransformControls } from "drei";

const Model = ({orbitControls, object, category, position}) => {

  const gltf = useGLTFLoader("/"+ category + "/" + object + ".gltf", true);
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
        translationSnap={0.1}
        ref={transformControls}
      >
        <group position={position}>
          <mesh attach="material" receiveShadow scale={[1, 1, 1]}>
            <primitive object={gltf.scene} dispose={null} />
          </mesh>
        </group>
      </TransformControls>
    );
}

export default Model;