import React from "react";
import { ToastContainer } from "react-toastify";
import loadable from "@loadable/component";
import Grid from "@mui/material/Grid";

import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { RootState } from "./redux/store";
import { createJob } from "./redux/modules/job";

import { Job } from "./redux/modules/job/types";

import "./App.css";

const Layout = loadable(() => import("./components/Layout"));
const JobForm = loadable(() => import("./components/Form/JobForm"));

function App() {
  const dispatch = useAppDispatch();

  const onAddJob = (job: Job) => {
    dispatch(createJob(job));
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <JobForm onAdd={onAddJob} />
        </Grid>
        <Grid item xs={6}>
          Job detail
        </Grid>
        <Grid item xs={4}>
          Most used skills
        </Grid>
        <Grid item xs={8}>
          Job board
        </Grid>
      </Grid>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
