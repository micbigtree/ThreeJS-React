import React from "react";
import { connect } from "react-redux";
import CubeMesh from "./CubeMesh";

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

export default connect()(Entities);
