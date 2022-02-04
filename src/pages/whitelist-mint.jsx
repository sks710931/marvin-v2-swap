import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { PresaleMinter } from "../components/mint/presale";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import RedditIcon from "@material-ui/icons/Reddit";
import ReactPlayer from "react-player/lazy";
export const WhitelistMintPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">
          Follow our social channels to win the whitelist spots.
        </Typography>
        <div>
          <IconButton
            onClick={() =>
              window.open("https://t.me/MarvinTokenOfficial", "_blank")
            }
            className={classes.social}
          >
            <TelegramIcon className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open("https://twitter.com/MarvinToken", "_blank")
            }
            className={classes.social}
          >
            <TwitterIcon className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open(
                "https://www.facebook.com/Elons-Marvin-100592502419662",
                "_blank"
              )
            }
            className={classes.social}
          >
            <FacebookIcon className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open("https://reddit.com/r/MarvinToken", "_blank")
            }
            className={classes.social}
          >
            <RedditIcon className={classes.icon} />
          </IconButton>
          <IconButton
            onClick={() => window.open("https://t.me/MarvinTokenAnn", "_blank")}
            className={classes.social}
          >
            <TelegramIcon className={classes.icon} />
          </IconButton>
        </div>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <div className="player-cont">
              <ReactPlayer
                muted={true}
                loop
                playing={true}
                width="100%"
                height="100%"
                url="https://firebasestorage.googleapis.com/v0/b/elons-marvin.appspot.com/o/second.mp4?alt=media&token=a4b76131-5a4e-41dd-95fa-f57ca1b5748d"
              />
            </div>
            <PresaleMinter />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  social: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  icon: {
    height: 50,
    width: 50,
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
}));
