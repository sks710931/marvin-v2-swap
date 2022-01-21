import React, { useState, useEffect } from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  Box,
    Button,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import LaunchIcon from "@material-ui/icons/Launch";
import bnb from "../../assets/images/bnb.png";
import logo from "../../assets/images/logo2.png";
import { getFormattedEther } from "../../utils/utils";
import { Contract } from "@ethersproject/contracts";
import { tokenContract } from "../../connectors/address";
import erc20Abi from "../../abi/erc20.json";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import { Fragment } from "react";
import metamask from "../../assets/images/metamask-fox.svg";
import {injectedConnector} from "../../connectors/injected-connector";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export const Account = () => {
  const classes = useStyles();
  const { account, library, activate, error } = useWeb3React();
  const [marvinBal, setMarvinBal] = useState("0.0000");
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      if (account) {
        const balance = await library?.getBalance(account);
        console.log(getFormattedEther(balance));
        setBalance(getFormattedEther(balance));
      }
    }
    getBalance();
  }, [library, account]);

  useEffect(() => {
    const getMarvinBal = async () => {
      const signer = await library.getSigner();
      const erc20 = new Contract(tokenContract, erc20Abi.abi, signer);
      erc20.on("Transfer", async () => {
        const bal1 = await erc20.balanceOf(account);
        const bal2 = formatUnits(bal1, "gwei");
        setMarvinBal(bal2);
      });

      const bal = await erc20.balanceOf(account);
      const bal3 = formatUnits(bal, "gwei");
      setMarvinBal(getFormattedEther(parseUnits(bal3, "ether")));
    };
    if (library && account) {
      getMarvinBal();
    }
  }, [library, account]);
  const handleMetamaskClick = () =>{
    activate(injectedConnector);
  }

  useEffect(() => {
    if (error) {
      switch (error.name) {
        case "UnsupportedChainIdError":
          alert(
            "Selected network is not supported. Please switch your network to Binance Smart Chain Mainnet"
          );
          break;
        case "NoEthereumProviderError":
          alert(
            "You do not have metamask installed. Please install metamask to connect to the application."
          );
          break;
        default:
          alert(error);
          break;
      }
    }
  }, [error]);
  return (
    <div>
      {account ? (
        <Fragment>
          <Box
            width="100%"
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            <AccountBalanceWalletIcon className={classes.walletIcon} />
            <Typography className={classes.wallet}>{account}</Typography>
            <Tooltip title="Copy Address">
              <IconButton onClick={() => {
                  copy(account);
                  toast.success("Copied to clipboard successfully!")
              }}>
                <FileCopyIcon className={classes.utilityIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View in explorer">
              <IconButton
                onClick={() =>
                  window.open(
                    `https://bscscan.com/address/${account}`,
                    "_blank"
                  )
                }
              >
                <LaunchIcon className={classes.utilityIcon} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            width="100%"
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            <IconButton disabled>
              <img className={classes.coinLogo} src={bnb} alt="bnb" />
            </IconButton>
            <Typography className={classes.bal}>{balance ? commify(balance) : "0.0000"}</Typography>
            <IconButton disabled>
              <img className={classes.marvinLogo} src={logo} alt="bnb" />
            </IconButton>
            <Typography className={classes.bal}>
              {commify(marvinBal)}
            </Typography>
          </Box>
        </Fragment>
      ) : (
       <Box display="flex" flexDirection="column" alignItems="center" width="100%">
           <Typography variant="h5">
                Connect your wallet
           </Typography>
           <Button onClick={handleMetamaskClick} className={classes.metamaskBtn} variant="outlined">
               <img className={classes.metamaskLogo} src={metamask} alt="Metamask" /> Metamask
           </Button>
       </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  walletIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
  },
  wallet: {
    fontSize: 25,
    fontWeight: 700,
    marginRight: theme.spacing(2),
  },
  utilityIcon: {
    width: 18,
    height: 18,
    color: theme.palette.grey,
  },
  coinLogo: {
    width: 30,
    height: 30,
  },
  marvinLogo: {
    width: 38,
    height: 38,
  },
  bal: {
    fontSize: 24,
    color: theme.palette.secondary.light,
    fontWeight: 600,
  },
  metamaskBtn:{
    width: 350,
    height: 70,
    marginTop: theme.spacing(3),
    fontSize: 20
  },
  metamaskLogo:{
    width: 50,
    height: 50,
    marginRight: theme.spacing(2)
}
}));
