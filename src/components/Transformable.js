import React, { useEffect, useRef } from "react";
import { TransformControls } from "drei";

function Transformable({ enabled, children, orbitControls }) {
  const transformControls = useRef();

  useEffect(() => {
    if (transformControls.current) {
      const controls = transformControls.current;
      const callback = (event) =>
        (orbitControls.current.enabled = !event.value);
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <TransformControls ref={transformControls}>{children}</TransformControls>
  );
}

export default Transformable;
