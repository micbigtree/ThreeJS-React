import React from "react";
import "../App.scss";

const SpinningMesh = (props) => {
  const handleClick = () => {
    props.remove(props.cube.id);
  };

  return (
    <div style={styles.container}>
      <p>id:{props.id} </p>
      <div style={styles.position}>
        <p>
          <strong>x:</strong>
          {props.position[0]}
          <strong>y:</strong>
          {props.position[1]}
          <strong>z:</strong>
          {props.position[2]}
        </p>
      </div>
      <p>size:{props.cube.args} </p>
      <p>color:{props.cube.color} </p>
      <button value={props.cube.id} onClick={handleClick}>
        Remove
      </button>
    </div>
  );
};

const styles = {
  container: {
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    padding: "2.5%"
  },
  position: {}
};

export default SpinningMesh;
