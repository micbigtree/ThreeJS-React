const initialState = {};

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

export default reducer;
