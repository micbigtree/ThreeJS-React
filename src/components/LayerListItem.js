import React from "react";

import "../App.scss";
import { useShapeStore } from "../zustand/shapes";

const LayerListItem = ({
  id,
  shape,
  position,
  color,
  selected,
  handleSelected,
}) => {
  
  const {
    updatePosition,
    updateDestination,
    removeShape,
    artboards,
    currentArtboard,
    destination,
  } = useShapeStore();

  return (
    <div style={selected === id ? styles.containerSelected : styles.container} key={id} onPointerDown={ () => {handleSelected(id)}}>
      <div style={styles.id}>id:{id}</div>
      <div style={styles.shape}>shape: {shape}</div>
      Position:
      <div style={styles.position}>
        <div style={styles.positionVector}>
          <label> x: </label>
          <input style={styles.inputField} placeholder={position[0]} />
          <button
            onClick={() => {
              updatePosition({
                id,
                currentArtboard,
                position: [position[0] - 1, position[1], position[2]],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updatePosition({
                id,
                currentArtboard,
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
              updatePosition({
                id,
                currentArtboard,
                position: [position[0], position[1] - 1, position[2]],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updatePosition({
                id,
                currentArtboard,
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
              updatePosition({
                id,
                currentArtboard,
                position: [position[0], position[1], position[2] - 1],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updatePosition({
                id,
                currentArtboard,
                position: [position[0], position[1], position[2] + 1],
              });
            }}
          >
            +
          </button>
        </div>
      </div>
      <div style={styles.dropdownContainer}>
        Links to:
        <select
          selected={destination}
          onChange={(e) => {
            updateDestination({
              id,
              currentArtboard,
              destination: e.target.value,
            });
          }}
          id="myDropdown"
        >
          <option value={null}>none</option>
          {Object.keys(artboards).map((mapped) => (
            <option key={mapped} value={mapped}>
              {mapped}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.color}>color: {color}</div>
      <div style={styles.remove}>
        <button
          onClick={() => {
            removeShape({ currentArtboard, id });
          }}
        >
          Remove
        </button>
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
    height: 155,
  },
  containerSelected: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "5px",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    width: "100%",
    height: 155,
    backgroundColor: "grey"
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
