import React, { ReactNode } from "react";
import { TabPanel } from "@mui/lab";

interface TabPanelProps {
  // props...
  children?: ReactNode;
  sx?: any;
  value?: string | any;
}

const MUITabPanel: React.FC<TabPanelProps> = ({ sx, value, children }) => {
  return <TabPanel sx={sx} value={value} >{children}</TabPanel>;
};

export default MUITabPanel;
