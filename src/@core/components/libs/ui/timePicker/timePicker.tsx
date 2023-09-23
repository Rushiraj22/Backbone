import React, { useState } from "react";
import { TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

interface CustomTimePickerProps {
    label: string;
}

const MUITimePicker = (props: CustomTimePickerProps) => {
    const { label, ...rest } = props;
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
    };

    return (
        <TimePicker
            renderInput={(props: any) => <TextField {...props} label={label} />}
            value={selectedTime}
            onChange={handleTimeChange}
            {...rest}
        />
    );
};

export default MUITimePicker;