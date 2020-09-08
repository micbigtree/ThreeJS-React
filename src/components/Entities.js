import React from "react";
import { connect } from "react-redux";
import CubeMesh from "./CubeMesh";

const Entities = (props) => {
  const objects = [
    {
      id: 0,
      shape: "box",
      position: [0, 0, 0],
      color: "lightgreen",
      speed: "2",
      args: [1, 1, 2]
    },
    {
      id: 0,
      shape: "box",
      position: [0, 0, 0],
      color: "lightgreen",
      speed: "2",
      args: [1, 1, 2]
    }
  ];

  // props.cubes.map((mapped) => {
  // objects.push(mapped);

  //  });

  return objects.map((mapped) => (
    <group>
      <CubeMesh
        id={mapped.id}
        position={mapped.position}
        positionX={props.positionX}
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
