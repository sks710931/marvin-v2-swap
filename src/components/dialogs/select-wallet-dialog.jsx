import React,{useEffect} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Button, DialogActions, DialogContent, Divider } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import metamaskLogo from "../../assets/images/metamask-fox.svg";
import { makeStyles } from "@material-ui/styles";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../connectors/injected-connector";
import { walletConnect } from "../../connectors/wallet-connect";
import wc from "../../assets/images/wc.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const SelectWalletDialog = ({ open, onClose }) => {
  const handleClose = () => {
    onClose(true);
  };
  const classes = useStyles();
  const { activate , error} = useWeb3React();
  const handleMetamaskClick = async () =>{
      await activate(injectedConnector);
    
    onClose(true);
  }
  const handleWalletConnectClick = async () =>{
    await activate(walletConnect);
  
  onClose(true);
}

  useEffect(() => {
    if (error) {
      console.log(error)
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
          
          break;
      }
    }
  }, [error]);
 
  return (
    <Dialog maxWidth={600} onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle>Connect to Wallet</DialogTitle>
      <Divider />
      <DialogContent>
        <div className={classes.content}>
          <Button className={classes.metamask} variant="text" onClick={handleMetamaskClick}>
            {" "}
            <img className={classes.metamaskLogo} src={metamaskLogo} alt="metamaskLogo" /> Metamask
          </Button>
          <Button className={classes.metamask} variant="text" onClick={handleWalletConnectClick}>
            {" "}
            <img className={classes.metamaskLogo} src={wc} alt="metamaskLogo" /> Wallet Connect
          </Button>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions>
      <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    width: 500,
    display:'flex',
    flexDirection:"column",
    justifyContent:'center',
    alignItems: "center"
  },
  metamask: {
    fontSize: 25,

  },
  metamaskLogo:{
    height: 50,
    width: 50,
    marginRight: 20
  }
}));
