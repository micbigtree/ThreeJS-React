import React from "react";
import { useObjectStore } from "../zustand/objects";
import { useShapeStore } from "../zustand/shapes";

const ObjectTopbar = () => {

const { addObject } = useObjectStore();
const { currentArtboard } = useShapeStore();

  return (
    <div style={styles.container}>
      
      <div>
        Kitchen
        <button
          style={styles.addButton}
          id={"Kitchen_1278"}
          value={"kitchen"}
          onClick={(e) =>
            addObject({
              currentArtboard,
              category: e.target.value,
              object: e.target.id,
            })
          }
        >
          Kitchen scene
        </button>
        <button
          style={styles.addButton}
          id={"ExpressoPot"}
          value={"kitchen"}
          onClick={(e) =>
            addObject({
              currentArtboard,
              category: e.target.value,
              object: e.target.id,
            })
          }
        >
          Espresso Pot
        </button>
        <button
          style={styles.addButton}
          id={"Coffee Cup_final"}
          value={"kitchen"}
          onClick={(e) =>
            addObject({
              currentArtboard,
              category: e.target.value,
              object: e.target.id,
            })
          }
        >
          Coffee Cup
        </button>
      </div>
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
