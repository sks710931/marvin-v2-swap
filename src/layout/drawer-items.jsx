import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { shortenAddress } from "../utils/utils";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
export const DrawerItems = () => {
    const {account} = useWeb3React();
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={`${account? shortenAddress(account): "Connect Wallet"}`} />
      </ListItem>
      <ListItem button>
        <ListItemIcon  >
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Marvin Sale" />
      </ListItem>
    </div>
  );
};
