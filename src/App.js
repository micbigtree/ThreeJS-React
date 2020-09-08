import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Viewport from "./components/Viewport";
import LayerList from "./components/LayerList";
import cubes from "./data/cubes.json";

const App = () => {
  const initialState = {
    positionX: 0
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "INCREMENTX":
        return {
          positionX: state.positionX + 1
        };
      case "DECREMENTX":
        return {
          positionX: state.positionX - 1
        };
      default:
        return state;
    }
  };

  const store = createStore(reducer);

  const [cubeState, setCubeState] = useState(cubes);

  const addShape = (e) => {
    setCubeState([
      ...cubeState,
      {
        id: cubeState.length + 1,
        shape: e.target.value,
        position: [0, 0, 0],
        color: "red",
        speed: "10"
      }
    ]);
  };

  const [passDownPosition, setPassDownPosition] = useState([0, 0, 0]);

  const setSidebarPosition = (position) => {
    setPassDownPosition(position);
  };

  const adjustShapePosition = (change) => {
    setPassDownPosition(passDownPosition + change);
  };

  const removeCube = (id) => {
    setCubeState(cubeState.filter((item) => item.id !== id));
  };

  return (
    <Provider store={store}>
      <div style={styles.container}>
        <div style={styles.addButtons}>
          <button style={styles.addButton} value="box" onClick={addShape}>
            Add Cube
          </button>
          <button style={styles.addButton} value="sphere" onClick={addShape}>
            Add Sphere
          </button>
          <button style={styles.addButton} onClick={addShape}>
            Add Cylinder
          </button>
          <button style={styles.addButton} onClick={addShape}>
            Add Cone
          </button>
        </div>

        <div style={styles.viewport}>
          <Viewport setSidebarPosition={setSidebarPosition} cubes={cubeState} />
        </div>
        <div style={styles.layerList}>
          <LayerList
            setShapePosition={adjustShapePosition}
            position={passDownPosition}
            remove={removeCube}
            cubes={cubeState}
          />
        </div>
      </div>
    </Provider>
  );
};

const styles = {
  container: {
    overflow: "scroll"
  },
  viewport: { outline: "none" },
  layerList: {
    width: "20%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    overflow: "scroll"
  },
  addButtons: {
    overflow: "auto",
    whiteSpace: "nowrap"
  },
  addButton: {
    display: "inline-block",
    textAlign: "center",
    padding: "1%"
  }
};

export default App;
