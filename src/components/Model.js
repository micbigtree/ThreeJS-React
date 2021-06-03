import React, { useRef, useEffect, useState } from "react";
import { useGLTFLoader, TransformControls } from "drei";
import { useObjectStore } from "../zustand/objects";
// import ShapePanel from "../components/ShapePanel";
import * as THREE from "three";

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
  objectDetails
}) => {
  const gltf = useGLTFLoader("/" + category + "/" + object + ".gltf", true);
  const [modelGeometry, setModelGeometry] = useState();

  if (!modelGeometry) {
    const modelScene = gltf.scene.clone(true);
    setModelGeometry(modelScene);
  }

  const {
    objectsAreLoaded,
    currentObjectArtboard,
    updateObjectPosition
  } = useObjectStore();

  const worldPosition = new THREE.Vector3();

  const transformControls = useRef();

  const clickedShape = (id) => {
    handleSelectedObject(id, position, rotation, scale, object);
  };

  const handleObjectPositionChange = () => {
    const controls = transformControls.current;

    updateObjectPosition({
      id,
      currentObjectArtboard,
      position: Object.values(controls.object.getWorldPosition(worldPosition))
    });
  };

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      const callback = (event) => {
        orbitControls.current.enabled = !event.value;
        handleObjectPositionChange();
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <TransformControls
      position={objectsAreLoaded && position}
      rotation={rotation}
      showY={selected === id ? true : false}
      showX={selected === id ? true : false}
      showZ={selected === id ? true : false}
      translationSnap={0.1}
      ref={transformControls}
    >
      <mesh
        onPointerDown={() => clickedShape(id)}
        attach="material"
        receiveShadow
        scale={scale}
      >
        <primitive object={modelGeometry} dispose={null} />
        {/* {selected !== 0 ? (
          <Html transform>
            <ShapePanel
              id={objectDetails.id}
              position={objectDetails.position}
              rotation={objectDetails.rotation}
              scale={objectDetails.scale}
              shape={objectDetails.name}
              camera={false}
            />
          </Html>
        ) : (
          ""
        )} */}
      </mesh>
    </TransformControls>
  );
};

export default Model;
