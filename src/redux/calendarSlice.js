import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCalendars as CalendarsServices } from "../services/calendarServices";

export const getCalendars = createAsyncThunk(
  "get-calendars",
  async ({ month, year }) => {
    const response = await CalendarsServices(month, year);
    return response;
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    values: [], // Initialize as an empty array
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendars.fulfilled, (state, action) => {
        state.values = Object.values(action.payload).map(item => ({...item, transactions: item.transactions ?? []}));
      })
      .addCase(getCalendars.rejected, (state, action) => {
        console.log("rejected get calendars");
      });
  },
});

export default calendarSlice;
