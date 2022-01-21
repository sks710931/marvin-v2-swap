import React, { useState } from "react";
import { Account } from "../components/user/account";
import { Tabs, Tab, AppBar, makeStyles } from "@material-ui/core";
import { TabPanel } from "../components/shared/tab-panel";
export const UserPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const onTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    const classes = useStyles();

  return (
    <div>
        <Account />
      <AppBar className={classes.tabBar} position="static" >
        <Tabs
        value={selectedTab}
        onChange={onTabChange}>
          <Tab label="All Tokens" />
          <Tab label="Market" />
          <Tab label="Marvin NFT's" />
        </Tabs>
        
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
            <h1>"All Tokens"</h1>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
            <h1>"Item Two"</h1>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
            <h1>"Item Three"</h1>
        </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
    tabBar:{
        backgroundColor: "transparent",
    }
}));