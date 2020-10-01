import React from "react";

import { useZusStore } from "../zustand/artboards";
import CubeMesh from "./CubeMesh";

const Entities = ({
  orbitControls,
}) => {

const { artboards, currentArtboard } = useZusStore();

  return artboards[currentArtboard].map((mapped) => (
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
  ));
};

export default Entities;

