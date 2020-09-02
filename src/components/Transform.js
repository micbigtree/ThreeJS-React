import React from "react";
import { TransformControls } from "drei";

const Transform = (props) => {
  return <TransformControls>{props.children}</TransformControls>;
};

export default Transform;
