import { Button, Chip, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import logo from "./../assets/images/logo2.png";
import LaunchIcon from "@material-ui/icons/Launch";
import { SwapContainer } from "../components/staking/container";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { MarvinV1Contract, MarvinV2Contract, MarvinV2SwapContract } from "../connectors/address";
import v1Abi from '../abi/v1.json';
import v2Abi from '../abi/v2.json';
import swapAbi from '../abi/swap.json';
import { commify, formatUnits,  } from "@ethersproject/units";

export const SwapPage = () => {
  const classes = useStyles();
  const {library, account} = useWeb3React();
  const [marvinv1Bal, setMarvinV1Bal] = useState("0.0000");
  const [poolMarvinBal, setPoolMarvinBal] = useState("0.0000");
  const [poolV2MarvinBal, setPoolV2MarvinBal] = useState("0.0000");
  const [swapCountState, setSwapCount] = useState(0);
  useEffect(() => {

    const getMarvinBal = async () => {
      const signer = await library.getSigner();
      const marvinV1 = new Contract(MarvinV1Contract, v1Abi.abi, signer);
      const marvinSwap = new Contract(MarvinV2SwapContract,swapAbi.abi , signer);

      const balBig = await marvinV1.balanceOf(account);
      const bal =  formatUnits(balBig, "gwei");
      const poolBalBig = await marvinV1.balanceOf(MarvinV2SwapContract);
      const poolBal = formatUnits(poolBalBig,"gwei");
      const marvinV2 = new Contract(MarvinV2Contract, v2Abi.abi, signer);
      const poolV2BalBig = await marvinV2.balanceOf(MarvinV2SwapContract);
      const poolV2Bal = formatUnits(poolV2BalBig,"gwei");

      const swapCount = await marvinSwap.totalSwapCount();
      setSwapCount(formatUnits(swapCount,0));

      setMarvinV1Bal(bal);
      setPoolMarvinBal(poolBal);
      setPoolV2MarvinBal(poolV2Bal);
    }
    if(library && account){
      getMarvinBal();
    }
  }, [library, account])
  return (
    <div>
      <Typography variant="h3">V2 Token Swap</Typography>
      <Typography variant="subtitle1">
        Swap your MARVIN to get MARVIN V2
      </Typography>
      <div className={classes.banner}>
        <div>
          <img className={classes.bannerLogo} src={logo} alt="token logo" />
        </div>
        <div className={classes.bannerMeta}>
          <Typography className={classes.title} color="secondary" variant="h4">
            {`${commify(marvinv1Bal)} MARVIN`}
          </Typography>
          <div className={classes.apy}>
            <Chip
              className={classes.chip}
              color="primary"
              label="Binance Smart Chain"
            />
            <Button endIcon={<LaunchIcon />}>V2 Contract</Button>
            <span className={classes.apyItem}>Pool Marvin Balance: {`${commify(poolMarvinBal)} MARVIN`}</span>
            <span className={classes.apyItem}>Pool Marvin V2 Balance: {`${commify(poolV2MarvinBal)} MARVIN`}</span>
            <span className={classes.apyItem}>Total Swaps executed: {swapCountState}</span>
          </div>
        </div>
      </div>

      <div className={classes.stakingContainer}>
          <SwapContainer />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  banner: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  bannerLogo: {
    height: 100,
    width: 100,
  },
  bannerMeta: {
    paddingLeft: 30,
  },
  title: {
    fontWeight: 500,
    marginBottom: 15,
  },
  chip: {
    marginRight: 10,
  },
  apy: {
    display: "flexible",
    flexDirection: "row",
  },
  apyItem: {
    marginLeft: 15,
  },
  stakingContainer:{
      marginTop: 30
  }
}));
