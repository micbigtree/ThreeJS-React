import React, { useRef, useEffect, useState } from "react";
import { useGLTFLoader, TransformControls, Html } from "drei";
import { useObjectStore } from "../zustand/objects";
import ShapePanel from "../components/ShapePanel";

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
    artboards,
    objectsAreLoaded,
    currentObjectArtboard
  } = useObjectStore();

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
        {selected !== 0 ? (
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
        )}
      </mesh>
    </TransformControls>
  );
};

const styles = {
  shapeDetailsContainer: {
    backgroundColor: "grey",
    width: "20%",
    height: "auto",
    right: 0
  }
};

export default Model;
