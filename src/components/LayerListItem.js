import React from "react";

import "../App.scss";
import { useObjectStore } from "../zustand/objects";

const LayerListItem = ({
  id,
  object,
  position,
  rotation,
  scale,
  destination
}) => {
  const {
    updateDestination,
    removeObject,
    artboards,
    currentObjectArtboard,
    objectsAreLoaded,
    updateObjectSelected,
    selectedObjectID
  } = useObjectStore();

  const clickedShape = (idVal) => {
    updateObjectSelected(idVal);
  };

  if (!objectsAreLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        style={
          selectedObjectID === id ? styles.containerSelected : styles.container
        }
        key={id}
        tabIndex={id}
        onPointerDown={() => clickedShape(id)}
        onBlur={() => clickedShape(0)}
      >
        <div style={styles.shape}>{object}</div>
        <div style={styles.dropdownContainer}>
          Links to:
          <select
            value={destination}
            onChange={(e) => {
              updateDestination({
                id,
                currentObjectArtboard,
                destination: e.target.value
              });
            }}
            id="myDropdown"
          >
            <option value="">none</option>
            if (!objectsAreLoaded)('Loading...'){" "}
            {Object.keys(artboards).map((mapped) => (
              <option key={mapped} value={mapped}>
                {mapped}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.remove}>
          <button
            onClick={() => {
              removeObject({ currentObjectArtboard, id });
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
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
    height: "auto"
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
    backgroundColor: "lightGrey"
  },
  position: {
    display: "flex",
    flexDirection: "row"
  },
  positionVector: {
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

export default LayerListItem;
