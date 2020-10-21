import React from "react";
import { useCameraStore } from "../../zustand/camera";
import "../../App.scss";

const RotationUI = ({ id, rotation }) => {
  const {
    cameraArtboards,
    currentCameraArtboard,
    updateCameraRotation,
  } = useCameraStore();


  
  return (
    <div style={styles.container} key={id}>
      Rotation:
      <div style={styles.rotation}>
        <div style={styles.rotationVector}>
          <label> y: </label>
          <input style={styles.inputField} placeholder={rotation[currentCameraArtboard]} />
          <button
            onClick={() => {
              updateCameraRotation({
                id,
                currentCameraArtboard,
                rotation: [
                  cameraArtboards[currentCameraArtboard].rotation[0],
                  cameraArtboards[currentCameraArtboard].rotation[1] - 1,
                  cameraArtboards[currentCameraArtboard].rotation[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateCameraRotation({
                id,
                currentCameraArtboard,
                rotation: [
                  cameraArtboards[currentCameraArtboard].rotation[0],
                  cameraArtboards[currentCameraArtboard].rotation[1] + 1,
                  cameraArtboards[currentCameraArtboard].rotation[2],
                ],
              });
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {},

  rotation: {
    display: "flex",
    flexDirection: "row",
  },
  rotationVector: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  inputField: {
    width: "100%",
  },
  dropdownContainer: {
    border: "none",
    cursor: "pointer",
  },
};

export default RotationUI;
