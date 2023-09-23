import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface CustomTextArea {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const MUITextArea = (props: CustomTextArea) => {
    const { onChange, value } = props;

    return (
        <TextField
            multiline
            maxRows={4}
            value={value}
            label="Multiline"
            onChange={onChange}
            id="textarea-outlined-controlled"
            fullWidth
        />
    )
}

export default MUITextArea