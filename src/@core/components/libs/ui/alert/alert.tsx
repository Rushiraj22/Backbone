import React, { ReactNode } from "react";
import { Alert } from "@mui/material";

interface AlertProps {
    children: ReactNode;
    sx?: any;
    icon: any;
    severity: string | any;
}

const MUIAlert: React.FC<AlertProps> = ({ sx, children, severity, icon }) => {
    return (
        <Alert sx={sx} icon={icon} severity={severity}>
            {children}
        </Alert>
    );
};

export default MUIAlert;