import React from "react";
import { useObjectStore } from "../zustand/objects";
import { useShapeStore } from "../zustand/shapes";

const ObjectTopbar = ({ }) => {

const { addObject } = useObjectStore();
const { currentArtboard } = useShapeStore();

  return (
    <div style={styles.container}>
      <button
        style={styles.addButton}
        value="boat_large"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Large boat
      </button>
      <button
        style={styles.addButton}
        value="boat_small"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Small boat
      </button>
      <button
        style={styles.addButton}
        value="ship_wreck"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Ship wreck
      </button>
      <button
        style={styles.addButton}
        value="ship_wreck"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Ship wreck
      </button>
      <button
        style={styles.addButton}
        value="pirate_crew"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Pirate crew
      </button>
      <button
        style={styles.addButton}
        value="tower"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Tower
      </button>
      <button
        style={styles.addButton}
        value="hole"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Hole
      </button>
      <button
        style={styles.addButton}
        value="ship_light"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Light ship
      </button>
      <button
        style={styles.addButton}
        value="ship_dark"
        onClick={(e) => addObject({ currentArtboard, name: e.target.value })}
      >
        Dark ship
      </button>
    </div>
  );
};

const styles = {
  container: {
      width: "20%"
  },
  addButton: {
    display: "inline-block",
    textAlign: "center",
  },
};

export default ObjectTopbar;
