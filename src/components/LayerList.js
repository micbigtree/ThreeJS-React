import React from "react";

import { useZusStore } from "../zustand/artboards";
import LayerListItem from "./LayerListItem";

const LayerList = () => {

  const { artboards, shapesAreLoaded, currentArtboard } = useZusStore();

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
