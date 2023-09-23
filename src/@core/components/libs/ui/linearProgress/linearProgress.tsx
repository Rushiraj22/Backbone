import React from "react";
import { LinearProgress } from "@mui/material";

interface MUILinearProgressProps {
    variant: string | any;
    sx: any;
    color: any;
    value: any;
}

const MUILinearProgress = (props: MUILinearProgressProps) => {
    const { variant, sx, color, value } = props;
    return <LinearProgress variant={variant} sx={sx} color={color} value={value}  />
};

export default MUILinearProgress;