import React from "react";
import { useObjectStore } from "../../zustand/objects";
import "../../App.scss";

const RotationUI = ({ id, rotation }) => {
 
  const {
    artboards,
    currentObjectArtboard,
    updateObjectRotation,
  } = useObjectStore();

  const objectById = artboards[currentObjectArtboard].find(({ id }) => id === id); 
  
  return (
    <div style={styles.container} key={id}>
      Rotation:
      <div style={styles.rotation}>
        <div style={styles.rotationVector}>
          <button
            onClick={() => {
              updateObjectRotation({
                id: id,
              currentArtboard: currentObjectArtboard,
                rotation: [
                  objectById.rotation[0],
                  objectById.rotation[1] - 0.1,
                  objectById.rotation[2],
                ],
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              updateObjectRotation({
                id: id,
              currentArtboard: currentObjectArtboard,
                rotation: [
                  objectById.rotation[0],
                  objectById.rotation[1] + 0.1,
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
  container: {display: "flex",
  flexDirection: "row",},

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
