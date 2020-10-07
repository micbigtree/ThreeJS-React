import React from "react";

import { useShapeStore } from "../zustand/shapes";
import Shape from "./Shape";
import PreviewShape from "./PreviewShape";

const Entities = ({ orbitControls }) => {
  const { artboards, currentArtboard, editorMode } = useShapeStore();

  return artboards[currentArtboard].map((mapped) =>
    editorMode ? (
      <group key={mapped.id}>
        <Shape
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

