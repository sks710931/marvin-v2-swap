import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import PersonIcon from "@material-ui/icons/Person";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { shortenAddress } from "../utils/utils";

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
          <SwapHorizIcon />
        </ListItemIcon>
        <ListItemText primary="Marvin V2 Swap" />
      </ListItem>
    </div>
  );
};
