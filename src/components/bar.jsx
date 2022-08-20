import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Marquee from "react-fast-marquee";
import { SyncClient } from "twilio-sync";
import config from "../config";

export default function Bar() {
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    async function fetchToken() {
      const body = {
        identity: config.SYNC_IDENTITY,
      };

      const options = {
        method: "POST",
        body: new URLSearchParams(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      };

      const resp = await fetch(config.SYNC_TOKEN_URL, options);
      const result = await resp.json();
      return result.token;
    }

    async function fetchMessages() {
      const token = await fetchToken();
      const client = new SyncClient(token);

      client.on("tokenAboutToExpire", async () => {
        let newToken = await fetchToken();
        client.updateToken(newToken);
      });

      const syncList = await client.list(config.SYNC_LIST_NAME);

      syncList.on("itemAdded", (event) => {
        setMessages((prev) => [...prev, event.item.data.message]);
      });

      syncList.on("itemRemoved", (event) => {
        let index = messages.indexOf(event.item.data.message);
        if (index > -1) {
          setMessages((prev) => prev.splice(index, 1));
        }
      });
    }

    fetchMessages();
  }, []);

  return (
    <Box
      sx={{
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(18, 28, 45)",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        position: "fixed",
      }}
    >
      <Box
        sx={{
          pl: "2rem",
          pr: "2rem",
          pt: "0.50rem",
          pb: "0.50rem",
        }}
      >
        <Marquee gradient={false}>
          {messages.map((k, i) => {
            return (
              <Typography
                key={i}
                variant="subtitle1"
                style={{ marginRight: 50 }}
              >
                {`+ ${k} +`}
              </Typography>
            );
          })}
        </Marquee>
      </Box>
    </Box>
  );
}
