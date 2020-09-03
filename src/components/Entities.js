import React, { useEffect, useRef, useState } from "react";

import App from "../App.js";
import Transformable from "./Transformable.js";

import CubeMesh from "./CubeMesh";
import ConeMesh from "./ConeMesh";
import CylinderMesh from "./CylinderMesh";
import SphereMesh from "./SphereMesh";

const Entities = (props) => {
  const objects = [];

  props.cubes.map((mapped) => {
    objects.push(mapped);
  });

  return objects.map((mapped) => (
    <group>
      <Transformable orbitControls={props.orbitControls}>
        <CubeMesh
          id={mapped.id}
          position={mapped.position}
          color={mapped.color}
          speed={mapped.speed}
          args={mapped.args}
          shape={mapped.shape}
        />
      </Transformable>
    </group>
  ));
};

export default Entities;
