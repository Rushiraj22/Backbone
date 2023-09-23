import React from "react";
import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

const MUIDatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default MUIDatePicker;