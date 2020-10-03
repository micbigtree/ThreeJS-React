import React, { useEffect } from "react";

import Viewport from "./components/Viewport";
import PreviewViewport from "./components/PreviewViewport";
import LayerList from "./components/LayerList";
import { useZusStore } from "./zustand/artboards";
import ArtboardPanel from "./components/ArtboardPanel";

const App = ( ) => {
  const {
    loadShapes,
    addShape,
    currentArtboard,
    editorMode,
    switchModes,
  } = useZusStore();

  useEffect(() => {
    loadShapes();
  }, []); // <-- empty dependency array

  return editorMode ? (
    <div style={styles.container}>
      <button
        onClick={() => {
          switchModes();
        }}
      >
        Switch to Preview
      </button>
      <h1>Editor</h1>
      <div style={styles.viewport}>
        <Viewport />
      </div>
      <div style={styles.artboardPanel}>
        <ArtboardPanel />
      </div>
      <div style={styles.layerList}>
        <div style={styles.addButtons}>
          <button
            style={styles.addButton}
            value="box"
            onClick={(e) => {
              addShape({ currentArtboard, shape: e.target.value });
            }}
          >
            Add Cube
          </button>
          <button
            style={styles.addButton}
            value="sphere"
            onClick={(e) => {
              addShape({ currentArtboard, shape: e.target.value });
            }}
          >
            Add Sphere
          </button>
          <button
            style={styles.addButton}
            value="cylinder"
            onClick={(e) => {
              addShape({ currentArtboard, shape: e.target.value });
            }}
          >
            Add Cylinder
          </button>
        </div>
        <LayerList />
      </div>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          switchModes();
        }}
      >
        Switch to Editor
      </button>
      <h1>Preview</h1>
      <PreviewViewport />
    </div>
  );
  };


const styles = {
  container: {
    overflow: "scroll",
  },
  viewport: { outline: "none" },
  layerList: {
    width: "20%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    overflow: "scroll",
  },
  addButtons: {
    overflow: "auto",
    whiteSpace: "nowrap",
    padding: "2.5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addButton: {
    display: "inline-block",
    textAlign: "center",
  },
};

export default App;
