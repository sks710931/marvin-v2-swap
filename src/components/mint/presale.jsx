import {
    Box,
    Button,
    IconButton,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import AddIcon from "@material-ui/icons/Add";
  import RemoveIcon from "@material-ui/icons/Remove";
  import { Fragment } from "react";
  import { useWeb3React } from "@web3-react/core";
  import { injectedConnector } from "../../connectors/injected-connector";
  import metamask from "../../assets/images/metamask-fox.svg";
  import nftAbi from "../../abi/v1NFT.json";
  import { nftV1 as NFT } from "../../connectors/address";
  import { Contract } from "@ethersproject/contracts";
  import { formatUnits, parseUnits } from "@ethersproject/units";
  import { toast } from "react-toastify";
  
  export const PresaleMinter = () => {
    const [mints, setMints] = useState(1);
    const { account, activate, library } = useWeb3React();
    const [minted, setMinted] = useState(0);
    const handleAdd = () => {
      if (mints < 20) {
        setMints(mints + 1);
      }
    };
    const handleRemove = () => {
      if (mints > 1) {
        setMints(mints - 1);
      }
    };
    const handleMetamaskClick = () => {
      activate(injectedConnector);
    };
    const price = 0.0750;
    const classes = useStyles();
  
    const getPriceValue = () => {
      const value = mints * price;
      return value.toString();
    };
  
    const mintNFT = async () => {
      try {
        if (account && library) {
          const signer = await library.getSigner();
          const contract = new Contract(NFT, nftAbi.abi, signer);
          let overRides = {
            value: parseUnits(getPriceValue(), "ether"),
          };
          const txResult = await contract.presaleMint(mints, overRides);
          await txResult.wait();
          toast.success(`${mints} Bossy Martian NFT's minted successfully!`)
        }
      } catch (err) {
          if(err.data){
              toast.error(err.data.message);
          }
          else{
              toast.error(err.message);
          }
      }
    };
  
    // load minted count
    useEffect(() => {
      const getMintedCount = async () => {
        const signer = await library.getSigner();
        const contract = new Contract(NFT, nftAbi.abi, signer);
        contract.on("CreateBossyMartian", async () => {
          const total1 = await contract.totalSupply();
          setMinted(Number(formatUnits(total1, 0)));
        });
        const total = await contract.totalSupply();
        setMinted(Number(formatUnits(total, 0)));
      };
      if (account && library) {
        getMintedCount();
      }
    }, [account, library]);
    return (
      <div className={classes.root}>
        {account ? (
          <Fragment>
            <span className={classes.counter}>
              Total Minted: <b className={classes.bold}>{minted}</b> / 2000
            </span>
            <Box display="flex" flexDirection="row">
              <div>
                <div className={classes.controls}>
                  <div className={classes.controlItem}>
                    <IconButton onClick={handleAdd}>
                      <AddIcon className={classes.icon} />
                    </IconButton>
                  </div>
                  <div className={classes.controlItem}>
                    <span className={classes.mintNumber}>{mints}</span>
                  </div>
                  <div className={classes.controlItem}>
                    <IconButton onClick={handleRemove}>
                      <RemoveIcon className={classes.icon} />
                    </IconButton>
                  </div>
                </div>
                <div className={classes.controlText}>
                  <span>
                    MAX YOU CAN MINT ON PRE-SALE IS <b className={classes.bold}>20</b>
                  </span>
                </div>
              </div>
  
              <div style={{ width: "100%", paddingLeft: "48px" }}>
                <Button
                  className={classes.mintButton}
                  variant="contained"
                  color="primary"
                  onClick={mintNFT}
                >
                  Mint Bossy Martian
                </Button>
                <div className={classes.buttonText}>
                  <span>
                    YOU'RE ABOUT TO MINT <b className={classes.bold}>{mints}</b>{" "}
                    BOSSY MARTIAN FOR{" "}
                    <b className={classes.bold}>{price * mints}</b> BNB + GAS FEE
                  </span>
                </div>
              </div>
            </Box>
          </Fragment>
        ) : (
          <div className={classes.connect}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h5">Connect your wallet</Typography>
              <Button
                onClick={handleMetamaskClick}
                className={classes.metamaskBtn}
                variant="outlined"
              >
                <img
                  className={classes.metamaskLogo}
                  src={metamask}
                  alt="Metamask"
                />{" "}
                Metamask
              </Button>
            </Box>
          </div>
        )}
      </div>
    );
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      border: `5px solid ${theme.palette.primary.light}`,
      width: "100%",
      margin: theme.spacing(3),
  
      borderRadius: 10,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down(900)]:{
        padding: theme.spacing(1),
        paddingTop: theme.spacing(1),
        margin: 2,
      }
    },
    controlCont:{
      marginRight: theme.spacing(2),
      [theme.breakpoints.down(900)]:{
        width: 150,
      }
    },
    controls: {
      height: 100,
      border: `4px solid ${theme.palette.secondary.main}`,
      borderRadius: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down(900)]:{
        width: 150,
        height: 80
      }
    },
    controlItem: {
      width: "100%",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      
    },
    icon: {
      height: 40,
      width: 40,
      [theme.breakpoints.down(900)]:{
        height: 20,
        width: 20
      }
    },
    mintNumber: {
      fontSize: 28,
      fontWeight: 700,
      [theme.breakpoints.down(900)]:{
        fontSize:18
      }
    },
    mintButton: {
      width: "100%",
      borderRadius: 10,
      fontSize: 28,
      fontWeight: 700,
      height: 100,
      [theme.breakpoints.down(900)]:{
        width: 300,
        height: 80,
        fontSize: 18,
      }
    },
    mintCont:{
      [theme.breakpoints.down(900)]:{
        width: 300,
        height: 80,
        fontSize: 18,
      }
    },
    controlText: {
      fontSize: 20,
      textAlign: "center !important",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down(900)]:{
        fontSize:14
      }
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center !important",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down(900)]:{
        fontSize:14
      }
    },
    bold: {
      color: theme.palette.secondary.light,
      fontWeight: 700,
    },
    counter: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down(900)]:{
        fontSize:16
      }
    },
    connect: {
      marginTop: theme.spacing(3),
    },
    metamaskBtn: {
      width: 350,
      height: 70,
      marginTop: theme.spacing(3),
      fontSize: 20,
    },
    metamaskLogo: {
      width: 50,
      height: 50,
      marginRight: theme.spacing(2),
    },
  }));
  