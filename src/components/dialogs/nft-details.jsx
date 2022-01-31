import {
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  DialogContent,
  Button,
  IconButton,
  Grid,
  Box,
  makeStyles,
  Paper,
  Typography,
  Chip,
} from "@material-ui/core";
import React, { Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NotesIcon from "@material-ui/icons/Notes";
import LanguageIcon from "@material-ui/icons/Language";
import { nftV1 } from "../../connectors/address";
import { useWeb3React } from "@web3-react/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const NFTDetailsDlg = ({ open, onClose, details }) => {
  const { account } = useWeb3React();
  const handleClose = () => {
    onClose(true);
  };
  const classes = useStyles();
  
  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
    >
      {details.metadata && (
        <Fragment>
          <DialogTitle>
            <IconButton onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
            {details.metadata.name}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ padding: "16px" }}>
                  <img
                    className={classes.image}
                    src={details.metadata.image}
                    alt={details.metadata.name}
                  />
                  <Paper variant="elevation" className={classes.descCont}>
                    <div>
                      <Typography variant="h5" color="primary">
                        Description
                      </Typography>
                      <p className={classes.desc}>{details.metadata.description}</p>
                      <Box display="flex" flexDirection="row">
                        <div>
                          <Button
                            onClick={() =>
                              window.open(
                                `https://bscscan.com/token/${nftV1}`,
                                "_blank"
                              )
                            }
                            color="secondary"
                            startIcon={<NotesIcon />}
                          >
                            Contract
                          </Button>
                        </div>
                        <div style={{ marginLeft: "16px" }}>
                          <Button
                            onClick={() =>
                              window.open("https://elonsmarvin.com", "_blank")
                            }
                            color="secondary"
                            startIcon={<LanguageIcon />}
                          >
                            Website
                          </Button>
                        </div>
                      </Box>
                    </div>
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ padding: "16px" }}>
                  <Paper className={classes.descCont} variant="outlined">
                    <Typography variant="h3">{details.metadata.name}</Typography>
                    {details.metadata.tokenId && (
                      <Typography className={classes.tokenId} variant="h6">
                        Token ID: {details.metadata.tokenId}
                      </Typography>
                    )}
                    <div className={classes.traitCont}>
                      {details.metadata.attributes &&
                        details.metadata.attributes.length > 0 &&
                        details.metadata.attributes.map((attribute) => {
                          return (
                            <Chip
                              color="secondary"
                              className={classes.chip}
                              label={`${attribute.trait_type} : ${attribute.value}`}
                            />
                          );
                        })}
                    </div>
                    <Typography className={classes.tokenId} variant="h6">
                      Owned By: {account}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};
const useStyles = makeStyles((theme) => ({
  content: {
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descCont: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[700]}`,
  },
  image: {
    width: "100%",
    borderRadius: 10,
    marginBottom: theme.spacing(4),
  },
  desc: {
    fontSize: 18,
  },
  tokenId: {
    marginTop: theme.spacing(2),
    textTransform: "uppercase",
    color: theme.palette.grey[400],
  },
  traitCont: {
    marginTop: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
