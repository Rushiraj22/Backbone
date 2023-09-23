import React, { ReactNode } from "react";
import { TabContext } from "@mui/lab";

interface TabContextProps {
  // props...
  children: ReactNode;
  value: string;
}

const MUITabContext: React.FC<TabContextProps> = ({ value, children }) => {
  return <TabContext value={value}>{children}</TabContext>;
};

export default MUITabContext;
