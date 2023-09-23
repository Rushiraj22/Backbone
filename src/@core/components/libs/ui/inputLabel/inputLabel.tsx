import React from "react";
import { InputLabel } from "@mui/material";

interface InputLabelProps {
    children: any;
    id: any;
}

const MUIInputLabel = (props: InputLabelProps) => {
    const { children, id } = props;
    return <InputLabel id={id}>{children}</InputLabel>;
};

export default MUIInputLabel;