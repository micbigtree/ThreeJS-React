import React from "react";
import { useObjectStore } from "../../zustand/objects";
import "../../App.scss";

const PositionUI = ({ id, position }) => {

  const {
    artboards,
    currentObjectArtboard,
    updateObjectPosition,
  } = useObjectStore();

  const objectById = artboards[currentObjectArtboard].find(({ id }) => id === id); 

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
              updateObjectPosition({
                id: id,
              currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0] - 0.5,
                  objectById.position[1],
                  objectById.position[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateObjectPosition({
                id: id,
                currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0] + 0.5,
                  objectById.position[1],
                  objectById.position[2],
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
              updateObjectPosition({
                id: id,
              currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0],
                  objectById.position[1] - 0.5,
                  objectById.position[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateObjectPosition({
                id: id,
              currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0],
                  objectById.position[1] + 0.5,
                  objectById.position[2],
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
              updateObjectPosition({
                id: id,
              currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0],
                  objectById.position[1],
                  objectById.position[2] - 0.5,
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateObjectPosition({
                id: id,
              currentArtboard: currentObjectArtboard,
                position: [
                  objectById.position[0],
                  objectById.position[1],
                  objectById.position[2] + 0.5,
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
