import React, { useState, useRef, useEffect } from "react";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import "../App.scss";
import Entities from "./Entities";
// react three fiber takes care of camera position in canvas
import { Canvas } from "react-three-fiber";
// drei have lots of shapes without writing code
import { softShadows, OrbitControls } from "drei";

softShadows();

const Viewport = (props) => {
  const orbitControls = useRef();
  const objects = [];

  objects.push(props.cubes);
  console.log(objects);

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
            <meshStandardMaterial color="gray" attach="material" opacity={1} />
          </mesh>
          <Entities orbitControls={orbitControls} cubes={props.cubes} />
          <OrbitControls ref={orbitControls} />
        </group>
      </Canvas>
    </div>
  );
};

const styles = {
  viewport: {
    position: "absolute",
    width: "60%",
    height: "75%",
    top: "12.5%",
    left: "20%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    outline: "none"
  }
};

export default Viewport;