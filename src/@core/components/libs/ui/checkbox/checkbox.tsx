import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormHelperText } from "@mui/material";

interface CheckboxProps {
    label?: any;
    checked?: boolean;
    onChange?: any;
    name?: string;
    sx?: any;
    errors?: string;
    value?: any;
}

const MUICheckbox = (props: CheckboxProps) => {
    const { label, checked, onChange, name, sx, errors, value } = props;
    return (
        <>
            <FormControlLabel
                label={label}
                control={<Checkbox name={name} checked={checked} onChange={onChange} sx={sx} value={value} />}
            />
            <FormHelperText sx={{ color: "error.main", ml: 0, mb: 6 }}>{errors}</FormHelperText>
        </>
    );
};

export default MUICheckbox;
