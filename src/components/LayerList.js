import React from "react";

import LayerListItem from "./LayerListItem";

const LayerList = (props) => {
  return props.cubes.map((mapped, index) => (
    <div style={styles.listItem}>
      <LayerListItem
        id={index}
        remove={props.remove}
        edit={props.edit}
        cube={mapped}
        position={props.position}
      />
    </div>
  ));
};

const styles = {
  listItem: {
    marginTop: "1%",
    marginLeft: "1%"
  }
};

export default LayerList;
