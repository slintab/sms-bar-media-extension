import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function VideoTitle({}) {
  return (
    <Box sx={{ m: 3 }}>
      <Typography
        align="center"
        variant="h3"
        color="rgb(18, 28, 45)"
        fontFamily={
          "Inter var experimental', 'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
        }
      >
        Your favourite Twilio Live Stream 
      </Typography>
    </Box>
  );
}
