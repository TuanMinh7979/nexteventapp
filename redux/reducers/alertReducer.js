const initState = {
  loading: false,
  success: "" | [],
  error: null,
};
const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALERT":
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
