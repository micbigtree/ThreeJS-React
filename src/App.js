import React, { useEffect, useState } from "react";

import Viewport from "./components/Viewport";
import PreviewViewport from "./components/PreviewViewport";
import LayerList from "./components/LayerList";
import { useShapeStore } from "./zustand/shapes";
import { useObjectStore } from "./zustand/objects";
import { useCameraStore } from "./zustand/camera";
import ArtboardPanel from "./components/ArtboardPanel";
import ShapePanel from "./components/ShapePanel";
import ObjectTopbar from "./components/ObjectTopbar";

const App = ( ) => {

const { loadObjects } = useObjectStore();

const {
    loadShapes,
    addShape,
    currentArtboard,
    editorMode,
    switchModes,
  } = useShapeStore();

  const { loadPreviewCameras } = useCameraStore();

  const [selected, setSelected] = useState(0);

  const [details, setDetails] = useState({
    id: '',
    position:[],
    color: '',
    shape: '',
  });
   const [objectDetails, setObjectDetails] = useState({
     id: "",
     position: [],
     name: "",
   });

const handleSelectedObject = (id, position, name,) => {
  setSelected(id);
  setObjectDetails({ id: id, position: position, name: name });
  console.log(id, position, name);
};

  const handleSelected = (id, position, color, shape) => {
    setSelected(id);
    setDetails({id: id, position: position, color: color, shape: shape})
    console.log(id, position, color, shape)
  };

  useEffect(() => {
    loadShapes();
    loadObjects();
    loadPreviewCameras();
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
      <ObjectTopbar />
      <div style={styles.viewport}>
        <Viewport
          details={details}
          objectDetails={objectDetails}
          selected={selected}
          handleSelected={handleSelected}
          handleSelectedObject={handleSelectedObject}
        />
      </div>
      <div style={styles.artboardPanel}>
        <ArtboardPanel />
      </div>
      <div style={styles.layerList}>
        <LayerList
          selected={selected}
          handleSelectedObject={handleSelectedObject}
        />
      </div>
      {selected !== 0 ? (
        <div style={styles.shapeDetailsContainer}>
          <ShapePanel
            id={objectDetails.id}
            position={objectDetails.position}
            shape={objectDetails.name}
          />
        </div>
      ) : (
        ""
      )}
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
  viewport: { outline: "none", flex: 1 },
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
  shapeDetailsContainer: {
    backgroundColor: "grey",
    width: "20%",
    height: "auto",
    right: 0,
  },
};

export default App;
