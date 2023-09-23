import React, { ReactNode } from "react";
import { TabList } from "@mui/lab";

interface TabListProps {
  // props...
  children: ReactNode;
  variant: string | any;
  scrollButtons: string | any;
  onChange: any;
  sx: any;
}

const MUITabList: React.FC<TabListProps> = ({ variant, scrollButtons, onChange, sx, children }) => {
  return <TabList variant={variant} scrollButtons={scrollButtons} onChange={onChange} sx={sx}>{children}</TabList>;
};

export default MUITabList;
