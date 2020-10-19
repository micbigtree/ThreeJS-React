import React from "react";

import "../App.scss";
import { useCameraStore } from "../zustand/camera";

const CameraPanel = ({ id, position, selected }) => {
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
          <input style={styles.inputField} placeholder={position[0]} />
          <button
            onClick={() => {
              updateCameraPosition({
                id,
                currentCameraArtboard,
                position: [position[0] - 1, position[1], position[2]],
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
                position: [position[0] + 1, position[1], position[2]],
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
                position: [position[0], position[1] - 1, position[2]],
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
                position: [position[0], position[1] + 1, position[2]],
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
                position: [position[0], position[1], position[2] - 1],
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
                position: [position[0], position[1], position[2] + 1],
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    width: "100%",
    backgroundColor: "lightGrey",
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

export default CameraPanel;
