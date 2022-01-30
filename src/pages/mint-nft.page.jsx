import React from "react";
import { Box, Grid } from "@material-ui/core";
import { VideoPlayer } from "../components/mint/player";
import { Minter } from "../components/mint/minter";

export const MintNFTPage = () => {
  return (
    <div style={{ height: "90%" }}>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <VideoPlayer />
              <Minter />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
};
