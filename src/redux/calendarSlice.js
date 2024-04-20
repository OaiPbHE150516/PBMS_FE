import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCalendars as CalendarsServices } from "../services/calendarServices";
import { toast } from "react-toastify";

export const getCalendars = createAsyncThunk(
  "get-calendars",
  async ({ month, year }, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await CalendarsServices(month, year, user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendars.fulfilled, (state, action) => {
        state.values = Object.values(action.payload).map((item) => ({
          ...item,
          transactions: item.transactions ?? [],
        }));
      })
      .addCase(getCalendars.rejected, (state, action) => {
        console.log("rejected get calendars");
      });
  },
});

export default calendarSlice;
