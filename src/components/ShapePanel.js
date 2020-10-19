import React from "react";

import PositionUI from "./UIValues/PositionUI";
import RotationUI from "./UIValues/RotationUI";
import ScaleUI from "./UIValues/ScaleUI";

import "../App.scss";
import { useObjectStore } from "../zustand/objects";

const ShapePanel = ({
  id,
  position,
  rotation,
  scale,
  selected,
}) => {
  const {
    updatePosition,
    updateDestination,
    removeShape,
    artboards,
    currentArtboard,
    destination,
  } = useObjectStore();

  return (
    <div style={styles.container} key={id}>
      <PositionUI position={position} />
      <RotationUI rotation={rotation} />
      <ScaleUI scale={scale} id={id} />
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
    height: 155,
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

export default ShapePanel;
