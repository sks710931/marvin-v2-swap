import React, { useState } from "react";
import { Account } from "../components/user/account";
import { Tabs, Tab, AppBar, makeStyles } from "@material-ui/core";
import { TabPanel } from "../components/shared/tab-panel";
import { useWeb3React } from "@web3-react/core";
import { Fragment } from "react";
import { Container } from "../components/user/nft/container";
export const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const onTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const classes = useStyles();
  const { account } = useWeb3React();
  return (
    <div>
      <Account />
      {account && (
        <Fragment>
          <AppBar className={classes.tabBar} position="static">
            <Tabs value={selectedTab} onChange={onTabChange}>
              <Tab label="Marvin NFT" />
              <Tab label="Market" />
            </Tabs>
          </AppBar>
          <TabPanel value={selectedTab} index={0}>
            <Container/>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <h1>Coming Soon</h1>
          </TabPanel>
        </Fragment>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  tabBar: {
    backgroundColor: "transparent",
  },
}));
