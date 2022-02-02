/* eslint-disable react-hooks/exhaustive-deps */
import { Contract } from "@ethersproject/contracts";
import { Button, CircularProgress, makeStyles, Paper } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { nftV1 } from "../../../connectors/address";
import nftAbi from "../../../abi/v1NFT.json";
import axios from "axios";
import { Fragment } from "react";
import winnerImg from "../../../assets/images/winner.png";

export const NFTCard = ({ tokenId, onDetailsClick }) => {
  const classes = useStyles();
  const { account, library } = useWeb3React();
  const [tokenUri, setTokenUri] = useState();
  const [metadata, setMetadata] = useState();
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isWinner, setIsWinner] = useState(false);
  const handleDetailsClick = () => {
    onDetailsClick({ metadata, tokenId, isWinner });
  };
  //get tokenUri
  useEffect(() => {
    const getTokenUri = async () => {
      const signer = await library.getSigner();
      const contract = new Contract(nftV1, nftAbi.abi, signer);
      const uri = await contract.tokenURI(tokenId);
      const colName = await contract.name();
      setName(colName);
      setTokenUri(uri);
    };
    if (account && library) {
      getTokenUri();
    }
  }, [account, library]);

  //get metadata
  useEffect(() => {
    if (tokenUri) {
      axios
        .get(tokenUri)
        .then((result) => {
          setMetadata(result.data);
        })
        .catch((err) => {
          console.log("Unable to load Metadata");
        });
    }
  }, [tokenUri]);

  useEffect(() => {
    if (metadata) {
      axios
        .get(metadata.image)
        .then((img) => {
          setImg(img.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [metadata]);
  return (
    <div className={classes.root}>
      <Paper className={`${classes.card}`} variant="elevation" elevation={10}>
        {isWinner && (
          <div className="winner">
            <img width="40px" src={winnerImg} alt="winner" />
            <span>Winner</span>
          </div>
        )}
        {metadata && (
          <Fragment>
            <img
              src={metadata.image}
              className={`${classes.image} ${imgLoaded ? "" : classes.imgHide}`}
              alt={metadata.name}
              onLoad={() => setImgLoaded(true)}
            />
            {!imgLoaded && (
              <div className={classes.imgLoader}>
                <CircularProgress color="primary" />
              </div>
            )}
            <div className={classes.name}>
              <span>{name}</span>
            </div>
            <div className={classes.mainText}>
              <h3>{metadata.name}</h3>
            </div>
            <div className={classes.btnDetailed}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleDetailsClick}
              >
                Details
              </Button>
            </div>
          </Fragment>
        )}
      </Paper>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  imgLoader: {
    height: 400,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    border: `1px solid ${theme.palette.grey[800]}`,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    height: 400,
    position: "center",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imgHide: {
    display: "none",
  },
  name: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[400],
    textTransform: "uppercase",
    fontWeight: 700,
  },
  mainText: {
    marginLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  btnDetailed: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));
