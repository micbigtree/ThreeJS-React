import React, { useEffect, useRef, useState } from "react";

import App from "../App.js";

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
      <CubeMesh
        id={mapped.id}
        position={mapped.position}
        color={mapped.color}
        speed={mapped.speed}
        args={mapped.args}
        shape={mapped.shape}
        orbitControls={props.orbitControls}
        setSidebarPosition={props.setSidebarPosition}
      />
    </group>
  ));
};

export default Entities;
