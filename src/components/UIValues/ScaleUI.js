import React, { useState } from "react";
import { useObjectStore } from "../../zustand/objects";
import "../../App.scss";

const ScaleUI = ({ id, scale }) => {
  const {
    artboards,
    currentObjectArtboard,
    updateObjectScale
  } = useObjectStore();

  const objectById = artboards[currentObjectArtboard].find(({ id }) => id);

  if (!objectById) {
    return <div></div>;
  } else
    return (
      <div style={styles.container} key={id}>
        Size:
        <div style={styles.scale}>
          <button
            disabled={
              (objectById.scale[0] <= 1,
              objectById.scale[1] <= 1,
              objectById.scale[2] <= 1)
                ? true
                : false
            }
            onClick={() => {
              updateObjectScale({
                id: id,
                currentObjectArtboard: currentObjectArtboard,
                scale: [
                  objectById.scale[0] - 1,
                  objectById.scale[1] - 1,
                  objectById.scale[2] - 1
                ]
              });
            }}
          >
            -
          </button>
          <button
            disabled={
              (objectById.scale[0] >= 10,
              objectById.scale[1] >= 10,
              objectById.scale[2] >= 10)
                ? true
                : false
            }
            onClick={() => {
              updateObjectScale({
                id: id,
                currentObjectArtboard: currentObjectArtboard,
                scale: [
                  objectById.scale[0] + 1,
                  objectById.scale[1] + 1,
                  objectById.scale[2] + 1
                ]
              });
            }}
          >
            +
          </button>
        </div>
      </div>
    );
};

const styles = {
  container: {},

  scale: {
    display: "flex",
    flexDirection: "row"
  },
  scaleVector: {
    flex: 1,
    display: "flex",
    flexDirection: "row"
  },
  inputField: {
    width: "100%"
  },
  dropdownContainer: {
    border: "none",
    cursor: "pointer"
  }
};

export default ScaleUI;
