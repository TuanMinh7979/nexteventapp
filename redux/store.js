import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";

import alertReducer from "./reducers/alertReducer";
export default configureStore({
  reducer: {
    eventSlice: eventSlice,
    alertState: alertReducer,
  },
});
