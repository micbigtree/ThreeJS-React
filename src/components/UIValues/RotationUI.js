import React from "react";
import { useCameraStore } from "../../zustand/camera";
import { useObjectStore } from "../../zustand/objects";
import "../../App.scss";

const RotationUI = ({ id, rotation, camera }) => {

const {
    cameraArtboards,
    currentCameraArtboard,
    updateCameraRotation,
  } = useCameraStore();


  const {
    artboards,
    currentObjectArtboard,
    updateObjectRotation,
  } = useObjectStore();

  const objectById = artboards[currentObjectArtboard].find(
    ({ id }) => id === id
  ); 
  
  return (
    <div style={styles.container} key={id}>
      Rotation:
      <div style={styles.rotation}>
        <div style={styles.rotationVector}>
          <label> y: </label>
          <input style={styles.inputField} placeholder={rotation[1]} />
          <button
            onClick={() => {
              camera
                ? updateCameraRotation({
                    id,
                    currentCameraArtboard,
                    rotation: [
                      cameraArtboards[currentCameraArtboard].rotation[0],
                      cameraArtboards[currentCameraArtboard].rotation[1] - 0.5,
                      cameraArtboards[currentCameraArtboard].rotation[2],
                    ],
                  })
                : updateObjectRotation({
                    id: id,
                    currentArtboard: currentObjectArtboard,
                    rotation: [
                      objectById.rotation[0],
                      objectById.rotation[1] - 0.5,
                      objectById.rotation[2],
                    ],
                  });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              camera
                ? updateCameraRotation({
                    id,
                    currentCameraArtboard,
                    rotation: [
                      cameraArtboards[currentCameraArtboard].rotation[0],
                      cameraArtboards[currentCameraArtboard].rotation[1] + 0.5,
                      cameraArtboards[currentCameraArtboard].rotation[2],
                    ],
                  })
                : updateObjectRotation({
                    id: id,
                    currentArtboard: currentObjectArtboard,
                    rotation: [
                      objectById.rotation[0],
                      objectById.rotation[1] + 0.5,
                      objectById.rotation[2],
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
