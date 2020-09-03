import React, { useState } from "react";
import Viewport from "./components/Viewport";
import LayerList from "./components/LayerList";

import cubes from "./data/cubes.json";

const App = () => {
  const [cubeState, setCubeState] = useState(cubes);

  const addShape = (e) => {
    setCubeState([
      ...cubeState,
      {
        id: cubeState.length + 1,
        shape: e.target.value,
        position: [0, 0, 0],
        color: "red",
        speed: "10"
      }
    ]);
  };

  const changeSidebarPosition = () => {};

  const removeCube = (id) => {
    setCubeState(cubeState.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.addButtons}>
        <button style={styles.addButton} value="box" onClick={addShape}>
          Add Cube
        </button>
        <button style={styles.addButton} value="sphere" onClick={addShape}>
          Add Sphere
        </button>
        <button style={styles.addButton} onClick={addShape}>
          Add Cylinder
        </button>
        <button style={styles.addButton} onClick={addShape}>
          Add Cone
        </button>
      </div>

      <div style={styles.viewport}>
        <Viewport cubes={cubeState} />
      </div>
      <div style={styles.layerList}>
        <LayerList remove={removeCube} cubes={cubeState} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    overflow: "scroll"
  },
  viewport: { outline: "none" },
  layerList: {
    width: "20%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    overflow: "scroll"
  },
  addButtons: {
    overflow: "auto",
    whiteSpace: "nowrap"
  },
  addButton: {
    display: "inline-block",
    textAlign: "center",
    padding: "1%"
  }
};

export default App;
