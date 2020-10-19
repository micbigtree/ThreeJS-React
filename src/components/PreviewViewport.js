import React, { useRef } from "react";

import { useShapeStore } from "../zustand/shapes";
import { useObjectStore } from "../zustand/objects";
import { useCameraStore } from "../zustand/camera";
import { PreviewCamera } from "./PreviewCamera.js";
import PreviewObject from "./PreviewObject";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import "../App.scss";
import { softShadows } from "drei";

softShadows();


const PreviewViewport = () => {

 const { objectsAreLoaded, artboards, currentObjectArtboard } = useObjectStore();
 const {
   cameraArtboards, currentCameraArtboard
 } = useCameraStore();
 

const orbitControls = useRef();

  if (!objectsAreLoaded) {
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
        <VRCanvas colorManagement>
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
            {artboards[currentObjectArtboard].map((mapped) => (
              <PreviewObject
                object={mapped.object}
                category={mapped.category}
                key={mapped.id}
                id={mapped.id}
                position={mapped.position}
                rotation={mapped.rotation}
                scale={mapped.scale}
                orbitControls={orbitControls}
                destination={mapped.destination}
              />
            ))}
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
