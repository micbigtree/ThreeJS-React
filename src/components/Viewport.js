import React, { useRef, Suspense } from "react";
import { Controls } from "react-three-gui";

import { useObjectStore } from "../zustand/objects";
import { useCameraStore } from "../zustand/camera";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

import "../App.scss";
import Camera from "./Camera";


// react three fiber takes care of camera position in canvas
import { Canvas } from "react-three-fiber";
// drei have lots of shapes without writing code
import { softShadows, OrbitControls } from "drei";
import ObjectsMapped from "./ObjectsMapped";

softShadows();

const Viewport = ({
  selected,
  cameraSelected,
  handleSelectedObject,
  handleSelectedCamera,
  objectDetails,
  mode
}) => {
  const orbitControls = useRef();
  const { objectsAreLoaded } = useObjectStore();
  const { cameraArtboards, currentCameraArtboard, cameraIsLoaded } = useCameraStore();


  if (!objectsAreLoaded) {
    return <div style={styles.viewport}>Loading...</div>;
  } else {
    return (
      <div style={styles.viewport}>
        <Canvas
          invalidateFrameloop
          onCreated={({ gl }) => {
            document.body.appendChild(VRButton.createButton(gl));
          }}
          vr={true}
          shadowMap
          colorManagement
          camera={{
            position: [0, 4, 4],
            fov: 80,
          }}
          onPointerMissed={() => {
            handleSelectedObject(0);
            handleSelectedCamera(false);
          }}
        >
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
              position={[0, 0, 0]}
            >
              <planeBufferGeometry attach="geometry" args={[100, 100]} />
              <meshStandardMaterial
                color="gray"
                attach="material"
                opacity={1}
              />
            </mesh> 
            <Suspense fallback={null}>
              <ObjectsMapped
                selected={selected}
                handleSelectedObject={handleSelectedObject}
                orbitControls={orbitControls}
                objectDetails={objectDetails}
              />
            </Suspense>
            <Suspense fallback={null}>
              <Camera
                orbitControls={orbitControls}
                cameraSelected={cameraSelected}
                handleSelectedCamera={handleSelectedCamera}
                mode={mode}
              />
            </Suspense>
            <OrbitControls maxPolarAngle={1.5} dampingFactor={1} keyPanSpeed={15} zoomSpeed={0.5} maxDistance={50} minDistance={5} enableZoom={true} enableDamping={true} ref={orbitControls} />
          </group>
        </Canvas>
      </div>
    );
  }
};

const styles = {
  viewport: {
    position: "absolute",
    width: "75%",
    height: "75%",
    top: "12.5%",
    left: "20%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    outline: "none",
  },
  shapePanelContainer : {

  },
};


export default Viewport;
