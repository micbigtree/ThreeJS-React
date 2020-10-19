import React from "react";
import { useCameraStore } from "../../zustand/camera";
import "../../App.scss";

const PositionUI = ({ id, position }) => {

const {
  cameraArtboards,
  currentCameraArtboard,
  updateCameraPosition,
} = useCameraStore();

  return (
    <div style={styles.container} key={id}>
      Position:
      <div style={styles.position}>
        <div style={styles.positionVector}>
          <label> x: </label>
          <input
            style={styles.inputField}
            placeholder={position[0]}
          />
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0] - 1,
                  cameraArtboards[currentCameraArtboard].position[1],
                  cameraArtboards[currentCameraArtboard].position[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0] + 1,
                  cameraArtboards[currentCameraArtboard].position[1],
                  cameraArtboards[currentCameraArtboard].position[2],
                ],
              });
            }}
          >
            +
          </button>
        </div>
        <div style={styles.positionVector}>
          <label> y: </label>
          <input style={styles.inputField} placeholder={position[1]} />
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0],
                  cameraArtboards[currentCameraArtboard].position[1] - 1,
                  cameraArtboards[currentCameraArtboard].position[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0],
                  cameraArtboards[currentCameraArtboard].position[1] + 1,
                  cameraArtboards[currentCameraArtboard].position[2],
                ],
              });
            }}
          >
            +
          </button>
        </div>
        <div style={styles.positionVector}>
          <label> z: </label>
          <input style={styles.inputField} placeholder={position[2]} />
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0],
                  cameraArtboards[currentCameraArtboard].position[1],
                  cameraArtboards[currentCameraArtboard].position[2] - 1,
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [
                  cameraArtboards[currentCameraArtboard].position[0],
                  cameraArtboards[currentCameraArtboard].position[1],
                  cameraArtboards[currentCameraArtboard].position[2] + 1,
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
  container: {

  },

  position: {
    display: "flex",
    flexDirection: "row",
  },
  positionVector: {
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

export default PositionUI;
