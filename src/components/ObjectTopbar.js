import React from "react";
import { useObjectStore } from "../zustand/objects";

const ObjectTopbar = () => {
  const { addObject, currentObjectArtboard } = useObjectStore();

  return (
    <div style={styles.container}>
      <div>
        Pirates
        <button
          style={styles.addButton}
          id={"boat_large"}
          value={"pirates"}
          onClick={(e) =>
            addObject({
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
            })
          }
        >
          Large boat
        </button>
        <button
          style={styles.addButton}
          id={"tower"}
          value={"pirates"}
          onClick={(e) =>
            addObject({
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
            })
          }
        >
          Tower
        </button>
        <button
          style={styles.addButton}
          id={"ship_dark"}
          value={"pirates"}
          onClick={(e) =>
            addObject({
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
            })
          }
        >
          Dark ship
        </button>
      </div>
      <div>
        Kitchen
        <button
          style={styles.addButton}
          id={"Kitchen_1278"}
          value={"kitchen"}
          onClick={(e) =>
            addObject({
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
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
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
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
              currentObjectArtboard,
              category: e.target.value,
              object: e.target.id
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
    textAlign: "center"
  }
};

export default ObjectTopbar;
