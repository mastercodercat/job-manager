import React from "react";
import { ToastContainer } from "react-toastify";
import loadable from "@loadable/component";
import Grid from "@mui/material/Grid";

import "./App.css";

const Layout = loadable(() => import("./components/Layout"));

function App() {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          Create a job form
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
