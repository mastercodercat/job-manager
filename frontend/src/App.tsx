import React from "react";
import { ToastContainer } from "react-toastify";
import loadable from "@loadable/component";
import Grid from "@mui/material/Grid";

import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { RootState } from "./redux/store";
import { fetchJobs, fetchJobDetail, createJob } from "./redux/modules/job";
import { fetchTopSkills } from "./redux/modules/skill";

import { Job } from "./redux/modules/job/types";

import "./App.css";

const Layout = loadable(() => import("./components/Layout"));
const JobForm = loadable(() => import("./components/Form/JobForm"));
const JobDetail = loadable(() => import("./components/JobDetail"));
const JobBoard = loadable(() => import("./components/JobBoard"));
const TopSkills = loadable(() => import("./components/TopSkills"));

function App() {
  const jobs = useAppSelector((state: RootState) => state.job.jobs);
  const currentJob = useAppSelector((state: RootState) => state.job.currentJob);
  const topSkills = useAppSelector((state: RootState) => state.skill.topSkills);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchTopSkills());
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
          <TopSkills skills={topSkills.data} />
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
