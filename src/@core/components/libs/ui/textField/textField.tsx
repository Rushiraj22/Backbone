import React from "react";
import TextField from "@mui/material/TextField";

interface FormField {
    label: string;
    placeholder: string;
    sx?: any;
    size: any;
    value?: any;
    onChange?: any;
}

const TextFieldComponent = (props: FormField) => {
    const { label, placeholder, sx, size } = props;
    return (
        <TextField
            fullWidth
            sx={sx}
            size={size}
            label={label}
            placeholder={placeholder}
        />
    )
}

export default TextFieldComponent;