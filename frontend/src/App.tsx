import React from "react";
import { ToastContainer } from "react-toastify";
import loadable from "@loadable/component";
import Grid from "@mui/material/Grid";

import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { RootState } from "./redux/store";
import { fetchJobs, fetchJobDetail, createJob } from "./redux/modules/job";

import { Job } from "./redux/modules/job/types";

import "./App.css";

const Layout = loadable(() => import("./components/Layout"));
const JobForm = loadable(() => import("./components/Form/JobForm"));
const JobDetail = loadable(() => import("./components/JobDetail"));
const JobBoard = loadable(() => import("./components/JobBoard"));

function App() {
  const jobs = useAppSelector((state: RootState) => state.job.jobs);
  const currentJob = useAppSelector((state: RootState) => state.job.currentJob);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const onAddJob = (job: Job) => {
    dispatch(createJob(job));
  };

  const onJob = (job: Required<Job>) => {
    dispatch(fetchJobDetail(job.id));
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <JobForm onAdd={onAddJob} />
        </Grid>
        <Grid item xs={6}>
          <JobDetail job={currentJob.data} />
        </Grid>
        <Grid item xs={4}>
          Most used skills
        </Grid>
        <Grid item xs={8}>
          <JobBoard jobs={jobs.data} onClick={onJob} />
        </Grid>
      </Grid>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
