import React from "react";

import { useShapeStore } from "../zustand/shapes";
import { useObjectStore } from "../zustand/objects";
import Model from "./Model";

const ObjectsMapped = ({ orbitControls, selected, handleSelectedObject }) => {
  const {
    artboards,
    objectsAreLoaded,
    currentObjectArtboard,
  } = useObjectStore();

  if (!objectsAreLoaded) {
    return <div>Loading...</div>;
  } else {
    return artboards[currentObjectArtboard].map((mapped) => (
      <Model
        key={mapped.id}
        position={mapped.position}
        rotation={mapped.rotation}
        scale={mapped.scale}
        id={mapped.id}
        destination={mapped.destination}
        object={mapped.object}
        category={mapped.category}
        orbitControls={orbitControls}
        selected={selected}
        handleSelectedObject={handleSelectedObject}
      />
    ));
  }
};

export default ObjectsMapped;
