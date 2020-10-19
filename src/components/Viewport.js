import React, { useRef, Suspense } from "react";
import { useObjectStore } from "../zustand/objects";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

import "../App.scss";
import Entities from "./Entities";
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
  handleSelected,
  handleSelectedObject,
  handleSelectedCamera,
  objectDetails,
}) => {
  const orbitControls = useRef();
  const { objectsAreLoaded } = useObjectStore();

  if (!objectsAreLoaded) {
    return <div style={styles.viewport}>Loading...</div>;
  } else {
    return (
      <div style={styles.viewport}>
        <Canvas
          onCreated={({ gl }) => {
            document.body.appendChild(VRButton.createButton(gl));
          }}
          vr={true}
          shadowMap
          colorManagement
          camera={{ position: [0, 2, 5], fov: 60 }}
          onPointerMissed={() => {
            handleSelected(0);
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
            <Camera
              orbitControls={orbitControls}
              cameraSelected={cameraSelected}
              handleSelectedCamera={handleSelectedCamera}
            />
            <OrbitControls ref={orbitControls} />
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
