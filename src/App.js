import React, { useEffect, useState } from "react";

import Viewport from "./components/Viewport";
import PreviewViewport from "./components/PreviewViewport";
import LayerList from "./components/LayerList";
import { useShapeStore } from "./zustand/shapes";
import { useObjectStore } from "./zustand/objects";
import { useCameraStore } from "./zustand/camera";
import ArtboardPanel from "./components/ArtboardPanel";
import ShapePanel from "./components/ShapePanel";
import CameraPanel from "./components/CameraPanel";
import ObjectTopbar from "./components/ObjectTopbar";
import { current } from "immer";

const App = ( ) => {

const { loadObjects } = useObjectStore();

const {
    loadShapes,
    addShape,
    currentArtboard,
    editorMode,
    switchModes,
  } = useShapeStore();

  const { loadPreviewCameras, currentCameraArtboard, cameraArtboards } = useCameraStore();

  const [selected, setSelected] = useState(0);
  const [cameraSelected, setSelectedCamera] = useState(false);

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

    const [cameraDetails, setCameraDetails] = useState({
      id: "",
      position: [],
    });

const handleSelectedObject = (id, position, name,) => {
  setSelected(id);
  setObjectDetails({ id: id, position: position, name: name });
  console.log(id, position, name);
};

const handleSelectedCamera = (val) => {
  setSelectedCamera(val);
  setCameraDetails({ id: cameraArtboards[currentCameraArtboard].id, position: cameraArtboards[currentCameraArtboard].position });
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
          cameraDetails={cameraDetails}
          setCameraDetails={setCameraDetails}
          selected={selected}
          cameraSelected={cameraSelected}
          handleSelected={handleSelected}
          handleSelectedObject={handleSelectedObject}
          handleSelectedCamera={handleSelectedCamera}
        />
      </div>
      <div style={styles.artboardPanel}>
        <ArtboardPanel />
      </div>
      <div style={styles.layerList}>
        <LayerList
          selected={selected}
          cameraSelected={cameraSelected}
          handleSelectedObject={handleSelectedObject}
          handleSelectedCamera={handleSelectedCamera}
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
      {cameraSelected ? (
        <div style={styles.shapeDetailsContainer}>
          <CameraPanel
            id={cameraDetails.id}
            position={cameraDetails.position}
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
