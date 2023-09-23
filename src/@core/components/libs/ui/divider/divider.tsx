import React from "react";
import { Divider, Grid } from "@mui/material";

interface DividerProps {
    title?: string;
    sx?: any; 
}

const MUIDivider = (props: DividerProps) => {
    const { title, sx } = props;
    return (
        <Grid item xs={12}>
            <Divider sx={sx} >{title}</Divider>
        </Grid>
    );
};

export default MUIDivider;