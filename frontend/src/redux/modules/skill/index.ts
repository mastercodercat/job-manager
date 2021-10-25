import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../service/api";

import type { SkillState } from "./types";

const initialState: SkillState = {
  topSkills: {
    loading: false,
    data: [],
  },
};

export const fetchTopSkills = createAsyncThunk(
  "skill/fetchTopSkills",
  async () => {
    const response = await api.fetchTopSkills();

    return response.data;
  }
);

export const skillSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSkills.pending, (state, action) => {
        state.topSkills.loading = true;
      })
      .addCase(fetchTopSkills.fulfilled, (state, action) => {
        state.topSkills.data = action.payload;
        state.topSkills.loading = false;
      })
      .addCase(fetchTopSkills.rejected, (state, action) => {
        state.topSkills.loading = false;
      });
  },
});

export default skillSlice.reducer;
