import React from "react";
import { useObjectStore } from "../zustand/objects";

const ArtboardPanel = () => {
  // Takes the request to delete an artboard that is currently opened
  // first makes pseudo array of artboard objects, filtering out the deleted one,
  // then sets current artboard to an alternative. Then, after 1ms setTimeout,
  // runs the removeArtboard function with the selected artboard.
  const selectedDeleteRequest = (mapped) => {
    console.log("delete artboard request sent");
    updateArtboard(Object.keys(artboards).filter((key) => key !== mapped)[0]);
    setTimeout(() => {
      removeArtboard(mapped);
    }, 1);
  };

  const {
    artboards,
    addArtboard,
    removeArtboard,
    currentObjectArtboard,
    updateArtboard
  } = useObjectStore();

  console.log(Object.keys(artboards));

  return (
    <div style={styles.artboardContainer}>
      Editing scene: {currentObjectArtboard}
      {Object.keys(artboards).map((mapped) => (
        <div key={mapped} style={styles.artboardButtons}>
          <button
            style={{
              backgroundColor:
                parseFloat(mapped) === parseFloat(currentObjectArtboard)
                  ? "grey"
                  : "white",
              color:
                parseFloat(mapped) === parseFloat(currentObjectArtboard)
                  ? "white"
                  : "black"
            }}
            onClick={() => {
              updateArtboard(mapped);
            }}
          >
            {mapped}
          </button>
          <button
            onClick={() => {
              // Temporarily prevent deletion of '1' until bugfix
              // for breaking when attempting to delete 1
              if (mapped !== "1") {
                let length = Object.keys(artboards).length > 1 ? true : false;
                if (length) {
                  currentObjectArtboard === mapped
                    ? selectedDeleteRequest(mapped)
                    : removeArtboard(mapped);
                }
              }
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addArtboard}>+</button>
    </div>
  );
};

const styles = {
  artboardContainer: {
    padding: 5
  },
  artboardPanel: {
    display: "flex",
    flexDirection: "column"
  },
  artboardButtons: {
    display: "flex",
    flexDirection: "row"
  }
};

export default ArtboardPanel;
