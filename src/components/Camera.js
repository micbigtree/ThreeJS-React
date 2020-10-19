import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import "../App.scss";
import { Canvas, useLoader } from "react-three-fiber";

import { a } from "react-spring/three";
import { TransformControls, HTML } from "drei";
import { useCameraStore } from "../zustand/camera";

const Camera = ({ mode, orbitControls, cameraSelected, handleSelectedCamera }) => {
  const [hovered, setHovered] = useState(false);

  const {
    updateCameraPosition,
    currentCameraArtboard,
    cameraArtboards,
    cameraIsLoaded,
  } = useCameraStore();

  const worldPosition = new THREE.Vector3();

  const handlePositionChange = () => {
    const controls = transformControls.current;
    updateCameraPosition({
      currentCameraArtboard,
      position: Object.values(controls.object.getWorldPosition(worldPosition)),
    });
  };

  const transformControls = useRef();
  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
       controls.setMode(mode);
      const callback = (event) => {
        orbitControls.current.enabled = !event.value;
      };
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  if (!cameraIsLoaded) {
    return <group></group>;
  } else { 
    return (
      <>
        <TransformControls
          position={cameraIsLoaded && cameraArtboards[1].position}
          showY={cameraSelected}
          showX={cameraSelected}
          showZ={cameraSelected}
          translationSnap={0.1}
          ref={transformControls}
          onPointerUp={() => handlePositionChange()}
        >
          <a.mesh
            scale={[0.25,0.25,0.25]}
            castShadow
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={() => handleSelectedCamera(true)}
          >
            <sphereBufferGeometry attach="geometry" />
            <meshStandardMaterial
              attach="material"
              color="black"
              factor={0.6}
              opacity={hovered ? 0.4 : 0.5}
            />
          </a.mesh>
        </TransformControls>
      </>
    );
  }
};

export default Camera;
