import React from "react";
import { FormControl } from "@mui/material";

interface CustomFormControlProps {
    children: any;
    sx?: any;
    size?: string | any;
}

const MUIFormControl = (props: CustomFormControlProps) => {
    const { children, size, sx, ...restProps } = props;
    return <FormControl fullWidth size={size} sx={sx} {...restProps}>{children}</FormControl>;
};

export default MUIFormControl;
