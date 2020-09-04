import React, { useEffect, useRef } from "react";
import { TransformControls } from "drei";
import { applyProps } from "react-three-fiber";

function Transformable({ showY, children, orbitControls }) {
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
    <TransformControls
      showY={showY}
      translationSnap={1}
      ref={transformControls}
    >
      {children}
    </TransformControls>
  );
}

export default Transformable;
