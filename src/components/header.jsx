import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import config from "../config";

export default function Header({}) {
  return (
    <Box
      sx={{
        display: "flex",
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(18, 28, 45)",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ pl: "2rem", pt: "0.75rem", pb: "0.75rem", pr: "2rem" }}>
        <Typography variant="h6">
          Join the conversation! Text your message to {config.SMS_PHONE_NUMBER}
        </Typography>
      </Box>
    </Box>
  );
}
