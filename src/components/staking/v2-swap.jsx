import React,{useState, useEffect} from "react";
import { makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { MarvinV1Contract, MarvinV2SwapContract } from "../../connectors/address";
import v1Abi from '../../abi/v1.json';
import swapAbi from '../../abi/swap.json';
import { commify, formatUnits, parseUnits,  } from "@ethersproject/units";

export const V2Swap = () => {
  const classes = useStyles();
  const [marvinv1Bal, setMarvinV1Bal] = useState("0.0000");
  const {library, account} = useWeb3React();
  const [isSwapDisabled, setSwapDisabled] = useState(true);
  const [isApproveDisabled, setApproveDisabled] = useState(false)
  useEffect(() => {

    const getMarvinBal = async () => {
      const signer = await library.getSigner();
      const marvinV1 = new Contract(MarvinV1Contract, v1Abi.abi, signer);

      const balBig = await marvinV1.balanceOf(account);
      const bal =  formatUnits(balBig, "gwei");

      const result = await marvinV1.allowance(account, MarvinV2SwapContract);
       const resultVal = formatUnits(result, 0);
       const balresult = formatUnits(balBig, 0);
       console.log(resultVal, balresult)
      if(resultVal===balresult && resultVal !=="0"){
        setSwapDisabled(false);
        setApproveDisabled(true);
      }
      setMarvinV1Bal(bal);
    }
    if(library && account){
      getMarvinBal();
    }
  }, [library, account])

const handleApprove = async () => {
  const signer = await library.getSigner();
  const marvinV1 = new Contract(MarvinV1Contract, v1Abi.abi, signer);
  const resp = await marvinV1.approve(MarvinV2SwapContract, parseUnits(marvinv1Bal, "gwei"));
  await resp.wait();
  setSwapDisabled(false);
  setApproveDisabled(true);
}


const handleSwap = async () =>{
  const signer = await library.getSigner();
  const marvinSwap = new Contract(MarvinV2SwapContract,swapAbi.abi , signer);
  const resp = await marvinSwap.swapV1forV2();
  await resp.wait();
  setSwapDisabled(true);
  setApproveDisabled(true);
}
  return (
    <div className={classes.content}>
      <TextField className={classes.amount} disabled value={commify(marvinv1Bal)} variant="outlined" />
      <div className={classes.sliderTextContainer}>
        <div className={classes.sliderTextLeft}>
          <Typography variant="h5">
            Estimated MARVIN V2
          </Typography>
        </div>
        <div className={classes.sliderTextRight}>
          <Typography variant="h5">{commify(marvinv1Bal)}</Typography>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={handleApprove} disabled={isApproveDisabled} className={classes.btn1} variant="contained" color="primary">Approve</Button>
        <Button className={classes.btn2} onClick={handleSwap} disabled={isSwapDisabled} variant="contained" >Swap for V2</Button>
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
    marginBottom:5
  },
  sliderTextRight: {
    display: "flex",
    justifyContent: "flex-end",
    width: '100%'
  },
  sliderTextLeft: {
    display: "flex",
    justifyContent: "flex-start",
    width: '100%'
  },
  slider:{
    marginBottom: 15
  },
  amount:{
      width: "100%",
      marginBottom: 30
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center'
  },
  btn1:{
    marginRight: 10,
    width: '100%'
  },
  btn2:{
    marginLeft:10,
    width: '100%'
  },
}));
