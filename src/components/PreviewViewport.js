import React, { useRef, useEffect, useState } from "react";

import { useShapeStore } from "../zustand/shapes";
import { useCameraStore } from "../zustand/camera";
import { PreviewCamera } from "./PreviewCamera.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import "../App.scss";
import Entities from "./Entities";
import { Canvas } from "react-three-fiber";
import { softShadows } from "drei";

softShadows();


const PreviewViewport = () => {

 const { shapesAreLoaded } = useShapeStore();
 const { cameraArtboards, currentCameraArtboard } = useCameraStore();

const orbitControls = useRef();

  if (!shapesAreLoaded) {
    return <div style={styles.viewport}>Loading...</div>;
  } else {
    return (
      <div style={styles.viewport}>
        {/* <Canvas
          onCreated={({ gl }) => {
            document.body.appendChild(VRButton.createButton(gl));
          }}
          vr={true}
          shadowMap
          colorManagement
        > */}
          <VRCanvas>
          <DefaultXRControllers />
            <PreviewCamera
              position={cameraArtboards[currentCameraArtboard].position}
            />
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={1.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <ambientLight intensity={0.3} />
            <pointLight position={[-10, 0, -20]} intensity={0.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <group>
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.5, 0]}
              >
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
                <meshStandardMaterial
                  color="gray"
                  attach="material"
                  opacity={1}
                />
              </mesh>
              <Entities orbitControls={orbitControls} />
            </group>
          </VRCanvas>
        {/* </Canvas> */}
      </div>
    );
  }
}

const styles = {
  viewport: {
    position: "absolute",
    width: "95%",
    height: "95%",
    top: "5%",
    bottom: "5%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    outline: "none",
  },
};

export default PreviewViewport;
