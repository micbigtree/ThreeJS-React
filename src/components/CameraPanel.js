import React from "react";

import "../App.scss";
import { useCameraStore } from "../zustand/camera";

import PositionUI from "./UIValues/PositionUI";
import RotationUI from "./UIValues/RotationUI";


const CameraPanel = ({ id, position }) => {
  const {
    cameraArtboards,
    currentCameraArtboard,
    updateCameraPosition,
  } = useCameraStore();

  return (
    <div style={styles.container} key={id}>
      <PositionUI position={cameraArtboards[currentCameraArtboard].position} />
      <RotationUI rotation={cameraArtboards[currentCameraArtboard].rotation} />
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
