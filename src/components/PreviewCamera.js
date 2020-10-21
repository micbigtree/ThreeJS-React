import * as React from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

//code from this article: https://dev.to/jhsu/creating-a-hud-in-react-three-fiber-1953

const PI_2 = Math.PI / 2;
export const PreviewCamera = ({
  position
}) => {
  const { camera, gl } = useThree();
  const previousEvent = React.useRef();
  const dragging = React.useRef(false);
  const yawObject = React.useRef(new THREE.Object3D());
  const pitchObject = React.useRef(new THREE.Object3D());

  React.useEffect(() => {
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  React.useEffect(() => {
    yawObject.current.add(pitchObject.current);
    function pointerDown(event) {
      dragging.current = true;
      previousEvent.current = event;
    }

    function pointerMove(event) {
      if (dragging.current && previousEvent.current) {
        const movementX = event.screenX - previousEvent.current.screenX;
        const movementY = event.screenY - previousEvent.current.screenY;
        // direction determines which way dragging moves the camera (draft left for left or right for left)
        const direction = 1;
        yawObject.current.rotation.y += movementX * 0.002 * direction;
        pitchObject.current.rotation.x += movementY * 0.002 * direction;
        pitchObject.current.rotation.x = Math.max(
          -PI_2,
          Math.min(PI_2, pitchObject.current.rotation.x)
        );
      }

      previousEvent.current = event;
    }
    function pointerUp() {
      previousEvent.current = undefined;
      dragging.current = false;
    }
    gl.domElement.addEventListener("pointerdown", pointerDown, false);
    gl.domElement.addEventListener("pointermove", pointerMove, false);
    gl.domElement.addEventListener("pointerup", pointerUp, false);

    return () => {
      gl.domElement.removeEventListener("pointerdown", pointerDown);
      gl.domElement.removeEventListener("pointermove", pointerMove);
      gl.domElement.removeEventListener("pointerup", pointerUp);
    };
  }, [gl.domElement]);

  useFrame(() => {
    camera.rotation.x = pitchObject.current.rotation.x;
    camera.rotation.y = yawObject.current.rotation.y;
  });

  return <PlayerCamera position={position} />;
};

const PlayerCamera = ({ position }) => {
  const { size, setDefaultCamera } = useThree();

  const [camera] = React.useState(() => {
    const cam = new THREE.PerspectiveCamera(
      60,
      size.width / size.height,
      0.005,
      10000
    );
    cam.position.set(...position);
    cam.rotation.set(0, 0, 0);
    setDefaultCamera(cam);
    return cam;
  });

  // UPDATES CAMERA POSITION IF ARTBOARD IS CHANGED
  React.useEffect(() => {
    camera.position.set(...position);
  }, [position]);

  React.useEffect(() => {
    camera.aspect = size.width / size.height;
  }, [size, camera]);

  return <primitive object={camera} />;
};
