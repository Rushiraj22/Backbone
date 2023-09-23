import React from "react";
import { AlertTitle } from "@mui/material";

interface AlertTitleProps {
    title: string | any;
    sx: any;
    
}

const MUIAlertTitle: React.FC<AlertTitleProps> = ({ title, sx }) => {
    return (
        <AlertTitle sx={sx}>
            {title}
        </AlertTitle>
    );
};

export default MUIAlertTitle;