import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Track from "./track";

export default function Participant({ participant }) {
  const [tracks, setTracks] = useState([]);
  const audioTrack = tracks.find((track) => track.kind === "audio");
  const videoTrack = tracks.find((track) => track.kind === "video");

  useEffect(() => {
    const subscribedTracks = Array.from(participant.tracks.values())
      .filter((trackPublication) => trackPublication.track !== null)
      .map((trackPublication) => trackPublication.track);

    setTracks(subscribedTracks);

    const handleTrackSubscribed = (track) =>
      setTracks((prevTracks) => [...prevTracks, track]);

    const handleTrackUnsubscribed = (track) =>
      setTracks((prevTracks) => prevTracks.filter((t) => t !== track));

    participant.on("trackSubscribed", handleTrackSubscribed);
    participant.on("trackUnsubscribed", handleTrackUnsubscribed);

    return () => {
      participant.off("trackSubscribed", handleTrackSubscribed);
      participant.off("trackUnsubscribed", handleTrackUnsubscribed);
    };
  }, [participant]);

  return (
    (videoTrack || audioTrack) && (
      <Grid item xs={6}>
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 500,
              height: 270,
            },
          }}
        >
          <Paper sx={{ borderColor: "rgb(136, 145, 170)" }} variant="outlined">
            {audioTrack && <Track track={audioTrack} />}
            {videoTrack && <Track track={videoTrack} />}
            {!videoTrack && (
              <Box sx={{ m: 3 }} align="center">
                <Typography variant="h5" color="rgb(18, 28, 45)">
                  {participant.identity}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Grid>
    )
  );
}
