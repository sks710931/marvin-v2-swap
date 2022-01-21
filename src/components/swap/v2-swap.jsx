import React, { useState, useEffect } from "react";
import { makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { saleContract } from "../../connectors/address";
import saleAbi from "../../abi/sale.json";
import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import { toast } from "react-toastify";

export const V2Swap = () => {
  const classes = useStyles();
  const [marvinBal, setMarvinBal] = useState("0.0000");
  const { library, account } = useWeb3React();
  const [value, setValue] = useState("");
  useEffect(() => {
    const getMarvinBal = async () => {
      try {
        if (value === "" || value === "0") setMarvinBal(0);
        const signer = await library.getSigner();
        const contract = new Contract(saleContract, saleAbi.abi, signer);
        const balBig = await contract.getEstimatedMarvin(
          parseUnits(value, "ether")
        );
        const bal = formatUnits(balBig, "gwei");
        setMarvinBal(bal);
      } catch (err) {}
    };
    if (library && account) {
      getMarvinBal();
    }
  }, [library, account, value]);

  const handleBuy = async () => {
    try {
      let overRides = {
        value: parseUnits(value, "ether"),
      };
console.log(parseUnits(value, "ether"));
      const signer = await library.getSigner();
      const contract = new Contract(saleContract, saleAbi.abi, signer);
      const txResult = await contract.buyMarvinToken(overRides);
      await txResult.wait();
      setValue("");
      setMarvinBal(0);
    } catch (err) {
     if(err.data){
      if (err.data.message) {
        toast.error(err.data.message);
      }
      
     }else if(err.message){
      toast.error(err.message);
     }
     else{
      toast.error("Enter a valid amount.");
     }
    }
  };
  return (
    <div className={classes.content}>
      <TextField
        className={classes.amount}
        type="number"
        variant="outlined"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={classes.sliderTextContainer}>
        <div className={classes.sliderTextLeft}>
          <Typography variant="h5">Estimated MARVIN tokens</Typography>
        </div>
        <div className={classes.sliderTextRight}>
          <Typography variant="h5">{commify(marvinBal)}</Typography>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.btn2}
          onClick={handleBuy}
          color="primary"
          variant="contained"
        >
          Buy MARVIN Token
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20,
  },
  sliderTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  sliderTextRight: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  sliderTextLeft: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  slider: {
    marginBottom: 15,
  },
  amount: {
    width: "100%",
    marginBottom: 30,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn1: {
    marginRight: 10,
    width: "100%",
  },
  btn2: {
    width: "100%",
    marginTop: 20,
  },
}));
