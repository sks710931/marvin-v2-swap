import React,{useState} from "react";
import { Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../shared/tab-panel";
import { V2Swap } from "./v2-swap";
export const SwapTabs = () => {

    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
      };

  return (
    <div>
      <Tabs
      value={tab}
      indicatorColor="primary"
      onChange={handleChange}
      textColor="primary"
      aria-label="disabled tabs example"
      centered
    >
      <Tab label="Buy MARVIN Token" />
    </Tabs>
    <TabPanel value={tab} index={0}>
        <V2Swap />
    </TabPanel>
    </div>
  );
};
