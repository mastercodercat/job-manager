import React from "react";
import loadable from "@loadable/component";

import "./App.css";

const Layout = loadable(() => import("./components/Layout"));

function App() {
  return <Layout></Layout>;
}

export default App;
