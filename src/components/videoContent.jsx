import React, { useState, useEffect } from "react";
import TwilioVideo from "twilio-video";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Participant from "./participant";
import config from "../config";

export default function VideoContent({}) {
  const token =
    window.context?.TWILIO_ACCESS_TOKEN || config.TWILIO_VIDEO_TOKEN;
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function connect() {
      const room = await TwilioVideo.connect(token, {
        audio: false,
        video: false,
        tracks: [],
      });

      setParticipants(Array.from(room.participants.values()));

      const handleParticipantConnected = (participant) => {
        setParticipants((prev) => [...prev, participant]);
      };

      const handleParticipantDisconnected = (participant) => {
        setParticipants((prev) =>
          prev.filter((p) => p.sid !== participant.sid)
        );
      };

      room.on("participantConnected", handleParticipantConnected);
      room.on("participantDisconnected", handleParticipantDisconnected);
    }

    connect();
  }, []);

  return (
    <Box overflow="auto" sx={{ m: 3 }}>
      <Grid
        container
        spacing={4}
        alignContent="center"
        justifyContent="space-around"
        sx={{ pt: 2 }}
      >
        {participants.map((participant) => {
          return (
            <Participant key={participant.sid} participant={participant} />
          );
        })}
      </Grid>
    </Box>
  );
}
