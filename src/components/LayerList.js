import React from "react";
import { connect } from "react-redux";
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
        setShapePosition={props.setShapePosition}
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
const mapState = (state) => ({
  shapes: state.artboard.shapes
});
export default connect(mapState)(LayerList);
