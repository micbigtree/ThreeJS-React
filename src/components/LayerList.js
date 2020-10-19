import React from "react";
import { useObjectStore } from "../zustand/objects";
import { useShapeStore } from "../zustand/shapes";
import LayerListItem from "./LayerListItem";

const LayerList = ({ selected, handleSelectedObject }) => {

  const {
    // artboards,
    objectsAreLoaded,
    artboards,
    currentObjectArtboard,
  } = useObjectStore();

//I think the map problem is in here, as ArtboardPanel is mapping shapeStore fine and it's not mapping fine here
  const {
    shapesAreLoaded,
    currentArtboard,
  } = useShapeStore();

  if (!objectsAreLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul style={styles.list}>
        {artboards[currentObjectArtboard].map((objects) => (
          <li style={styles.listItem} key={objects.id}>
            <LayerListItem
              key={objects.id}
              id={objects.id}
              position={objects.position}
              object={objects.object}
              selected={selected}
              handleSelectedObject={handleSelectedObject}
            />
          </li>
        ))}
      </ul>
    );
  }
};

const styles = {
  listItem: {
    marginTop: "1%",

    listStyleType: "none",
  },
  list: {
    padding: 10
  }
};

export default LayerList;
