import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";

interface FormField {
  size?: any;
  label?: string | any;
  name: string;
  variant?: any;
  placeholder?: string | any;
  id?: any;
  onChange?: any;
  value?: string | number;
  error?: any;
  disabled?: boolean;
  type?: string;
  errorMessage?: string;
  accept?: any;
}

const InputText = (props: FormField) => {
  const { size, label, name, variant, placeholder, id, onChange, value, disabled, error, type, errorMessage, accept } = props;

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <TextField
        fullWidth
        size={size}
        label={label}
        name={name}
        variant={variant}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
        error={error}
        type={type}
        disabled={disabled}
        accept={accept}
      />
      <FormHelperText sx={{ color: 'error.main', ml: 0 }}>{errorMessage}</FormHelperText>
    </FormControl>
  )
}

export default InputText;