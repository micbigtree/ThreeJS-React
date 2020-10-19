import React from "react";
import { useObjectStore } from "../zustand/objects";
import { useShapeStore } from "../zustand/shapes";
import { useCameraStore } from "../zustand/camera";
import LayerListItem from "./LayerListItem";
import LayerListItemCamera from "./LayerListItemCamera";

const LayerList = ({ selected, handleSelectedObject, cameraSelected, handleSelectedCamera }) => {
  const {
    // artboards,
    objectsAreLoaded,
    artboards,
    currentObjectArtboard,
  } = useObjectStore();

  const {
    cameraArtboards,
    currentCameraArtboard,
    cameraIsLoaded,
  } = useCameraStore();

  if (!cameraIsLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul style={styles.list}>
        <li
          style={styles.listItem}
          key={cameraArtboards[currentCameraArtboard].id}
        >
          <LayerListItemCamera
            key={cameraArtboards[currentCameraArtboard].id}
            position={cameraArtboards[currentCameraArtboard].position}
            object={"Camera"}
            selected={cameraSelected}
            handleSelectedObject={handleSelectedObject}
            handleSelectedCamera={handleSelectedCamera}
          />
        </li>
        {artboards[currentObjectArtboard].map((objects) => (
          <li style={styles.listItem} key={objects.id}>
            <LayerListItem
              key={objects.id}
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
