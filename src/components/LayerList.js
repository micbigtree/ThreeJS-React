import React from "react";

import { useShapeStore } from "../zustand/shapes";
import LayerListItem from "./LayerListItem";

const LayerList = ({ selected, handleSelected }) => {
  const { artboards, shapesAreLoaded, currentArtboard } = useShapeStore();

  if (!shapesAreLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul style={styles.list}>
        {artboards[currentArtboard].map((shape) => (
          <li style={styles.listItem} key={shape.id}>
            <LayerListItem
              key={shape.id}
              id={shape.id}
              position={shape.position}
              shape={shape.shape}
              color={shape.color}
              selected={selected}
              handleSelected={handleSelected}
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
