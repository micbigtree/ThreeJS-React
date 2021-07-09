import React, { useRef, useEffect, useState, Suspense } from "react";
import { TransformControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
  objectDetails,
  url
}) => {
  // const gltf = useGLTF("./" + category + "/" + object + ".gltf");
  // const gltf = useLoader(GLTFLoader, "./" + category + "/" + object + ".gltf");
  const gltf = useLoader(GLTFLoader, url);
  console.log("loader created");
  // const gltf = useGLTF("/table.glb", "/draco-gltf");
  const [modelGeometry, setModelGeometry] = useState();

  if (!modelGeometry) {
    console.log("getting model geometry");
    console.log(gltf);
    setModelGeometry(gltf.scene.clone(true));
    console.log(gltf.scene);
  }

  const {
    objectsAreLoaded,
    currentObjectArtboard,
    updateObjectPosition,
    updateObjectSelected,
    selectedObjectID
  } = useObjectStore();

  const worldPosition = new THREE.Vector3();

  const transformControls = useRef();

  const clickedShape = () => {
    // handleSelectedObject(id, position, rotation, scale, object);
    updateObjectSelected(id);
    console.log("clicked!");
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
      showY={selectedObjectID === id ? true : false}
      showX={selectedObjectID === id ? true : false}
      showZ={selectedObjectID === id ? true : false}
      translationSnap={0.1}
      ref={transformControls}
    >
      {/* <mesh
        onPointerDown={() => clickedShape(id)}
        attach="material"
        receiveShadow
        scale={scale}
      > */}
      <Suspense fallback={null}>
        <mesh onClick={() => clickedShape()}>
          <primitive
            // onPointerDown={() => clickedShape(id)}

            // onClick={() => console.log("click!")}
            object={gltf.scene.clone(true)}
            dispose={null}
          />
        </mesh>
      </Suspense>
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
      {/* </mesh> */}
    </TransformControls>
  );
};

export default Model;
