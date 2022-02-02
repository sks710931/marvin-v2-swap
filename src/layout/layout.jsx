/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  useTheme,
  Divider,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/images/logo2.png";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { DrawerItems } from "./drawer-items";
import { SelectWalletDialog } from "../components/dialogs/select-wallet-dialog";
import { useWeb3React } from "@web3-react/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useLocation } from "react-router";
const drawerWidth = 240;
export const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { account, library, deactivate } = useWeb3React();
  const [balance, setBalance] = useState();
  const location = useLocation();
  useEffect(() => {
    async function getBalance() {
      if (account) {
        const balance = await library?.getBalance(account);
        setBalance(balance);
      }
    }
    getBalance();
  }, [library, account]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [walletSelectdDlgOpen, setWallectConnectDlgOpen] = useState(false);

  const handleWalletClose = (value) => {
    if (value) {
      setWallectConnectDlgOpen(false);
    }
  };

  const openWallet = () => {
    if (!account) {
      setWallectConnectDlgOpen(true);
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.sidebarLogo}>
        <img className={classes.logo} src={logo} alt="logoImage" />
      </div>
      <Divider />

      <DrawerItems />
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {getHeaderName(location.pathname)}
          </Typography>
          <div className={classes.right}>
            <div>
              {account ? (
                ""
              ) : (
                <Button
                  startIcon={<WalletIcon />}
                  variant="contained"
                  color="primary"
                  onClick={openWallet}
                  className={classes.connect}
                >
                  Connect
                </Button>
              )}
              {account ? (
                <Button
                  startIcon={<ExitToAppIcon />}
                  variant="contained"
                  color="primary"
                  className={classes.connect}
                  onClick={() => deactivate()}
                >
                  Logout
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <SelectWalletDialog
          open={walletSelectdDlgOpen}
          onClose={handleWalletClose}
        />
      </main>
    </div>
  );
};

const getHeaderName = (path) => {
  switch (path) {
    case "/":
      return "Your Account";
    case "/swap":
      return "Liquidity Swap";
    case "/nft-mint":
      return "Mint Bossy Martian NFT";
    case "/whitelist-mint":
        return "Whitelist Mint Bossy Martian NFT";
    default:
      return "";
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  sidebarLogo: {
    height: 240,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    height: "100%",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
    color: theme.palette.common.white,
  },
  right: {
    position: "relative",
  },
  connect: {
    width: 200,
    marginRight: 15,
  },
}));
