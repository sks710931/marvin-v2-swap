/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { VideoPlayer } from "../components/mint/player";
import { Minter } from "../components/mint/minter";
import yahoo from "../assets/images/yahoo.png";
import mw from "../assets/images/marketwatch.jpg";
import tw1 from "../assets/images/tweet1.PNG";
import tw2 from "../assets/images/tweet2.png";
export const MintNFTPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
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
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <div className={classes.about}>
              <Typography color="secondary" variant="h2">
                About the Project
              </Typography>
              <div className={classes.aboutText}>
                <p>
                  Elon's Marvin is a cryptocurrency project inspired by Elon
                  Musk's real life dog, Marvin. The project was founded in
                  October, 2021, and is currently in phase 2 of development. The
                  $MARVIN token is powered by the Binance Smart Chain, but is
                  also available for trading on the Ethereum blockchain.
                </p>
                <p>
                  With growing partnerships and initiatives the project plans to
                  evolve beyond its current status as a meme coin by introducing
                  more Gamfi and Defi features to its ecosystem. Play-to-earn
                  gaming, Metaverse integration, and an NFT marketplace are all
                  on the roadmap. Elon’s Marvin plans on being a major player in
                  cryptocurrency and Blockchain adoption moving into the future.
                  The Bossy Martian NFT Collection is our first step into the
                  Metaverse, where your Unique NFT character will be able to be
                  used in our first P2E game planned for launch in Q3.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <div className={classes.featured}>
              <Typography color="secondary" variant="h2">
                Featured In
              </Typography>
              <div className={classes.newsCont}>
                <div className={classes.newsItem}>
                  <a
                    href="https://money.yahoo.com/elons-marvin-token-uses-nfts-111500423.html"
                    target="_blank"
                  >
                    <img src={yahoo} alt="Yahoo" />
                  </a>
                </div>
                <div className={classes.newsItem}>
                  <a
                    target="_blank"
                    href="https://www.marketwatch.com/press-release/nfts-building-a-better-world-elons-marvin-token-2022-01-29?mod=search_headline"
                  >
                    <img src={mw} alt="Marketwatch" />
                  </a>
                </div>
              </div>
              <div className={classes.newsCont}>
                <div className={classes.tweetItem}>
                  <a
                    href="https://twitter.com/elonmusk/status/1354202453252710402?t=XywQUfVEOoHyJTsYM6ED3Q&s=19"
                    target="_blank"
                  >
                    <img width="100%" src={tw1} alt="Yahoo" />
                  </a>
                </div>
                <div className={classes.tweetItem}>
                  <a
                    href="https://twitter.com/elonmusk/status/1467573012765593602?t=D3AWKbwvDbb6pREhnp9a_w&s=19"
                    target="_blank"
                  >
                    <img width="100%" src={tw2} alt="Marketwatch" />
                  </a>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  newsCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    [theme.breakpoints.down(900)]: {
      flexDirection: "column",
    },
  },
  newsItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2),
    width: 300,
    height: 300,
    backgroundColor: theme.palette.common.white,
    borderRadius: 25,
  },
  tweetItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2),
    width: 300,
    backgroundColor: theme.palette.common.white,
    borderRadius: 25,
    '& a':{
      '& img':{
        borderRadius: 25,
      }
    }
  },
  about: {
    border: `4px dotted ${theme.palette.primary.main}`,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(900)]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
  aboutText: {
    fontSize: 24,
    [theme.breakpoints.down(900)]: {
      fontSize: 20,
    },
  },
  featured: {
    border: `4px dotted ${theme.palette.primary.main}`,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down(900)]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
}));
