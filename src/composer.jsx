import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header";
import Bar from "./components/bar";
import Container from "@mui/material/Container";
import VideoContent from "./components/videoContent";
import VideoTitle from "./components/videoTitle";

const Composer = () => {
  return (
    <Container maxWidth="false" disableGutters>
      <Header />
      <VideoTitle />
      <VideoContent />
      <Bar />
    </Container>
  );
};

ReactDOM.render(<Composer />, document.getElementById("video"));
