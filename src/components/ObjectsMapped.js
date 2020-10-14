import React from "react";

import { useShapeStore } from "../zustand/shapes";
import { useObjectStore } from "../zustand/objects";
import Model from "./Model";

const ObjectsMapped = ({ orbitControls, selected, handleSelected }) => {

  const { objectArtboards } = useObjectStore();
  const { currentArtboard } = useShapeStore();

  return objectArtboards[currentArtboard].map(
    (mapped) => (
      // editorMode ? (

        <Model
          position={mapped.position}
          destination={mapped.destination}
          object={mapped.name}
          orbitControls={orbitControls}
          selected={selected}
          handleSelected={handleSelected}
        />

    )
    // ) : (

    //       <PreviewShape
    //         key={mapped.id}
    //         id={mapped.id}
    //         position={mapped.position}
    //         color={mapped.color}
    //         speed={mapped.speed}
    //         args={[1, 1, 2]}
    //         shape={mapped.shape}
    //         orbitControls={orbitControls}
    //         destination={mapped.destination}
    //       />

    // )
  );
};

export default ObjectsMapped;
