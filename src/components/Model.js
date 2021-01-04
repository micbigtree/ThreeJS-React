import React, { useRef, useEffect, useState } from "react";
import { useGLTFLoader, TransformControls } from "drei";
const Model = ({
  orbitControls,
  object,
  category,
  position,
  rotation,
  scale,
  id,
  selected,
  handleSelectedObject,
}) => {

  const gltf = useGLTFLoader("/" + category + "/" + object + ".gltf", true);
  const [modelGeometry, setModelGeometry] = useState();

  if (!modelGeometry) {
    const modelScene = gltf.scene.clone(true);
    setModelGeometry(modelScene)
  }

  const transformControls = useRef();

  const clickedShape = (id) => {
    handleSelectedObject(id, position, rotation, scale, object);
  };

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
      showY={selected === id ? true : false}
      showX={selected === id ? true : false}
      showZ={selected === id ? true : false}
      translationSnap={0.1}
      ref={transformControls}
    >
      <group position={position}>
        <mesh
          onPointerDown={() => clickedShape(id)}
          attach="material"
          receiveShadow
          scale={scale}
        >
          <primitive object={modelGeometry} dispose={null} />
        </mesh>
      </group>
    </TransformControls>
  );
};

export default Model;