import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

interface BoxComponentProps extends BoxProps {
  // props...
}

const BoxComponent: React.FC<BoxComponentProps> = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};

export default BoxComponent;
