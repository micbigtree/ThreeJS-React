import React from "react";

import "../App.scss";
import { useCameraStore } from "../zustand/camera";

const LayerListItem = ({
  id,
  object,
  position,
  cameraSelected,
  handleSelectedCamera,
}) => {
  const {
    removeShape,
    cameraArtboards,
    currentCameraArtboard,
    updateCameraPosition,
  } = useCameraStore();

  const clickedShape = (id) => {
    handleSelectedCamera(true);
  };

  return (
    <div
      style={
        cameraSelected === id ? styles.containerSelected : styles.container
      }
      key={id}
      onPointerDown={() => clickedShape(id)}
    >
      <div style={styles.shape}>{object}</div>
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
    padding: "2.5%",
    width: "100%",
    height: "auto",
  },
  containerSelected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    padding: "2.5%",
    width: "100%",
    height: "auto",
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

export default LayerListItem;
