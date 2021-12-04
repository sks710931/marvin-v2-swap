import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Button, DialogActions, DialogContent, Divider } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import metamaskLogo from "../../assets/images/metamask-fox.svg";
import { makeStyles } from "@material-ui/styles";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../connectors/injected-connector";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const SelectWalletDialog = ({ open, onClose }) => {
  const handleClose = () => {
    onClose(true);
  };
  const classes = useStyles();
  const { activate } = useWeb3React();
  const handleMetamaskClick = () =>{
    activate(injectedConnector);
    onClose(true);
  }
  return (
    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle>Connect to Wallet</DialogTitle>
      <Divider />
      <DialogContent>
        <div className={classes.content}>
          <Button className={classes.metamask} variant="text" onClick={handleMetamaskClick}>
            {" "}
            <img className={classes.metamaskLogo} src={metamaskLogo} alt="metamaskLogo" /> Metamask
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
    width: 300,
    display:'flex',
    justifyContent:'center',
    alignItems: "center"
  },
  metamask: {
    fontSize: 25
  },
  metamaskLogo:{
    height: 50,
    width: 50,
    marginRight: 20
  }
}));
