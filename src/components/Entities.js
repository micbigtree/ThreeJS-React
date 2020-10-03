import React from "react";

import { useZusStore } from "../zustand/artboards";
import CubeMesh from "./CubeMesh";
import PreviewShape from "./PreviewShape";

const Entities = ({
  orbitControls,
}) => {

const { artboards, currentArtboard, editorMode } = useZusStore();

  return artboards[currentArtboard].map((mapped) =>
    editorMode ? (
      <group key={mapped.id}>
        <CubeMesh
          key={mapped.id}
          id={mapped.id}
          position={mapped.position}
          color={mapped.color}
          speed={mapped.speed}
          args={[1, 1, 2]}
          shape={mapped.shape}
          orbitControls={orbitControls}
        />
      </group>
    ) : (
      <group key={mapped.id}>
        <PreviewShape
          key={mapped.id}
          id={mapped.id}
          position={mapped.position}
          color={mapped.color}
          speed={mapped.speed}
          args={[1, 1, 2]}
          shape={mapped.shape}
          orbitControls={orbitControls}
          destination={mapped.destination}
        />
      </group>
    )
  );
};

export default Entities;

