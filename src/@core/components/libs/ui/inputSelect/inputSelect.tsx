import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText, TextField } from "@mui/material";
import MUIFormControl from "../formControl/formControl";

interface FormField {
  label: string;
  id: any;
  name: string;
  value: any;
  error: any;
  onChange: any;
  placeholder?: string | any;
  disabled: boolean;
  errorMessage?: string;
  dropDownData?: any;
  variant?: string | any;
}

const InputSelect = (props: FormField) => {
  const { label, id, name, value, error, onChange, placeholder, disabled, dropDownData, errorMessage, variant } = props;
  
  return (
    <MUIFormControl sx={{ width: '100%', mb: 6 }} size='small'>
      <TextField
        fullWidth
        select
        label={label}
        id={id}
        name={name}
        value={value}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        variant={variant}
      >
        {
          dropDownData?.map((row: any, item: any) => (
            <MenuItem key={item} value={row.code || row.category || row.paymentMode || row.declaredCurrency || row.status || row.type || row.tierType || row.timeSlot || row.id || row.locationType} >
              {row.name || row.accountType || row.category || row.paymentMode || row.declaredCurrency || row.status || row.type || row.tierType || row.timeSlot || row.addressLine1 || row.locationType}
            </MenuItem>
          ))
        }
      </TextField>
      {<FormHelperText sx={{ color: 'error.main', ml: 0 }}>{errorMessage}</FormHelperText>}
    </MUIFormControl>
  );
}

export default InputSelect;
