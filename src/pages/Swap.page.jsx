import { Button, Chip, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import logo from "./../assets/images/logo2.png";
import LaunchIcon from "@material-ui/icons/Launch";
import { SwapContainer } from "../components/staking/container";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { saleContract, tokenContract } from "../connectors/address";
import saleAbi from "../abi/sale.json";
import erc20Abi from "../abi/erc20.json";
import { commify, formatUnits } from "@ethersproject/units";
import { getFormattedEther } from "../utils/utils";
export const SwapPage = () => {
  const classes = useStyles();
  const { library, account } = useWeb3React();
  const [marvinBal, setMarvinBal] = useState("0.0000");
  const [poolMarvinBalance, setPoolMarvinBalance] = useState("0.0000");
  const [balance, setBalance] = useState();
  useEffect(() => {
    async function getBalance() {
      if (account) {
        const balance = await library?.getBalance(account);
        setBalance(balance);
      }
    }
    getBalance();
  }, [library, account]);
  useEffect(() => {
    const getMarvinBal = async () => {
      const signer = await library.getSigner();
      const contract = new Contract(saleContract, saleAbi.abi, signer);
      const erc20 = new Contract(tokenContract, erc20Abi.abi, signer);
      erc20.on("Transfer", async () => {
        const bal1 = await erc20.balanceOf(account);
        const bal2 = formatUnits(bal1, "gwei");
        setMarvinBal(bal2);
        const balance = await library?.getBalance(account);
        setBalance(balance);
        const poolBalBig1 = await contract.getmarvinBalance();
        const poolBal2 = formatUnits(poolBalBig1, "gwei");
        setPoolMarvinBalance(poolBal2);
      });
      const balBig = await erc20.balanceOf(account);
      const bal = formatUnits(balBig, "gwei");

      const poolBalBig = await contract.getmarvinBalance();
      const poolBal = formatUnits(poolBalBig, "gwei");
      setPoolMarvinBalance(poolBal);
      setMarvinBal(bal);
    };
    if (library && account) {
      getMarvinBal();
    }
  }, [library, account]);
  return (
    <div>
      <Typography variant="h3">Elon's Marvin Liquidity Swap</Typography>
      <Typography variant="subtitle1">
        Buy Marvin token at a discounted price.
      </Typography>
      <div className={classes.banner}>
        <div>
          <img className={classes.bannerLogo} src={logo} alt="token logo" />
        </div>
        <div className={classes.bannerMeta}>
          <span>Your Balance</span>
          <Typography className={classes.title} color="secondary" variant="h4">
            {`${commify(marvinBal)} MARVIN`} <tr></tr>{" "}
            {balance ? `${getFormattedEther(balance)} BNB` : "00.0000 BNB"}
          </Typography>
          <div className={classes.apy}>
            <Chip
              className={classes.chip}
              color="primary"
              label="Binance Smart Chain"
            />
            <Button
              endIcon={<LaunchIcon />}
              onClick={() =>
                window.open(
                  `https://bscscan.com/address/${saleContract}`,
                  "_blank"
                )
              }
            >
              Sale Contract
            </Button>
            <span className={classes.apyItem}>
              Pool Marvin Balance: {`${commify(poolMarvinBalance)} MARVIN`}
            </span>
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
  stakingContainer: {
    marginTop: 30,
  },
}));
