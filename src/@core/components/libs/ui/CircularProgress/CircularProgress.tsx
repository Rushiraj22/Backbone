import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface CircularProgressProps {
  size?: number | string;
  sx?: any;
}

const CircularProgressComponent: React.FC<CircularProgressProps> = ({ size, sx }) => {
  return <CircularProgress sx={sx} size={size} />;
};

export default CircularProgressComponent;