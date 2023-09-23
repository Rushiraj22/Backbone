import React from "react";
import { Grid } from "@mui/material";
interface CustomGridProps {
  container?: boolean;
  item?: boolean;
  xs?: boolean | number;
  sm?: boolean | number;
  md?: boolean | number;
  lg?: boolean | number;
  xl?: boolean | number;
  spacing?: number;
  children: React.ReactNode;
  sx?: any;
}

const MUIGrid: React.FC<CustomGridProps> = ({
  children,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing,
  sx
}) => {
  return (
    <Grid
      container={container}
      spacing={spacing}
      item={item}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={sx}
    >
      {children}
    </Grid>
  );
};

export default MUIGrid;