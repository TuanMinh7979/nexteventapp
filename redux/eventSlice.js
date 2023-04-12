import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAPI, postAPI } from "../utils/fetchData";
import { patchAPI } from "../utils/fetchData";
import { getAPI } from "../utils/fetchData";
export const addEvent = createAsyncThunk(
  "addEvent",
  async ({ newEvent, token }, thunkAPI) => {
    console.log("CAll dispatch......", token)
    try {
      thunkAPI.dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await postAPI(`event`, { data: newEvent }, token);

      thunkAPI.dispatch({
        type: "ALERT",
        payload: { loading: false, success: res.data.msg },
      });
      return res.data.newEvent;
    } catch (err) {
      thunkAPI.dispatch({
        type: "ALERT",
        payload: { error: err.response.data.msg },
      });
    }
  }
);
export const getEvents = createAsyncThunk(
  "getEvents",
  async ({ userId, token }, thunkAPI) => {
    try {
      thunkAPI.dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await getAPI(`event/user/${userId}`, token);

      thunkAPI.dispatch({
        type: "ALERT",
        payload: { loading: false, success: res.data.msg },
      });
      return res.data.events;
    } catch (err) {
      thunkAPI.dispatch({
        type: "ALERT",
        payload: { error: err.response.data.msg },
      });
    }
  }
);
export const updateEvent = createAsyncThunk(
  "updateEvent",

  async ({ data, token }, thunkAPI) => {
    try {
      console.log("------------------", data)
      thunkAPI.dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await patchAPI(`event/${data._id}`, { data }, token);

      thunkAPI.dispatch({
        type: "ALERT",
        payload: { success: res.data.msg },
      });
      return res.data.newEvent;
    } catch (err) {
      thunkAPI.dispatch({
        type: "ALERT",
        payload: { error: err.response.data.msg },
      });
    }
  }
);


export const deleteEvent = createAsyncThunk(
  "deleteEvent",
  async ({ data, token }, thunkAPI) => {

    try {
      thunkAPI.dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await deleteAPI(
        `event/${data}/`,

        token
      );

      thunkAPI.dispatch({
        type: "ALERT",
        payload: { loading: false, success: res.data.msg },
      });
      return data;
    } catch (err) {
      thunkAPI.dispatch({
        type: "ALERT",
        payload: { error: err.response.data.msg },
      });
    }
  }
);

export const eventSlice = createSlice({
  name: "abc",
  initialState: {
    // events:
    //   JSON.parse(sessionStorage.getItem("events")) == null
    //     ? []
    //     : JSON.parse(sessionStorage.getItem("events")),

    // selectedEvent:
    //   JSON.parse(sessionStorage.getItem("selectedEvent")) == null
    //     ? {}
    //     : JSON.parse(sessionStorage.getItem("selectedEvent")),
    events: [],
    filteredEvents: [],
    selectedEvent: {},
    activeEvent: [],
  },

  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;

    },
    setFilteredEvents: (state, action) => {
      state.filteredEvents = action.payload;
    },
    setActiveEvents: (state, action) => {
      state.activeEvent = action.payload;
    },
    updateEventState: (state, action) => {
      if (action.payload) {
        const updateEvents = state.events.map((e) => {
          return e._id == action.payload._id ? action.payload : e;
        });

        state.events = [...updateEvents];
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(addEvent.fulfilled, (state, action) => {
      if (action.payload) {
        state.events = [...state.events, action.payload];
      }
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      if (action.payload) {
        const updateEvents = state.events.map((e) => {
          return e._id == action.payload._id ? action.payload : e;
        });

        state.events = [...updateEvents];
      }
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {


      if (action.payload) {
        state.events = [...action.payload];
      }
    });

    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      const newEvents = state.events.filter((e) => e._id != action.payload);
      state.events = [...newEvents];
      state.selectedEvent = {};
    });
  },
});

export const { setSelectedEvent, setFilteredEvents, setActiveEvents, updateEventState } =
  eventSlice.actions;
export default eventSlice.reducer;
