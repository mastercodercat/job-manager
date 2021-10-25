import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../service/api";

import type { Job, JobState } from "./types";

const initialState: JobState = {
  jobs: {
    loading: false,
    data: [],
  },
  creating: false,
};

export const createJob = createAsyncThunk("job/createJob", async (job: Job) => {
  const response = await api.createJob(job);

  return response.data;
});

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.creating = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.data.push(action.payload);
        state.creating = false;
        toast.success(`Job ${action.payload.title} was successfully created.`);
      })
      .addCase(createJob.rejected, (state) => {
        state.creating = false;
      });
  },
});

export default jobSlice.reducer;
