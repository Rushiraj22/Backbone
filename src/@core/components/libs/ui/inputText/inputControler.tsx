import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormValue {
    name: string;
    control: any;
    rules: any;
    label: string;
    errors: any;
    placeholder: string;
    errorMessage?: any;
    rememberMeValue: any;
}

const FormTextField = (props: FormValue) => {
    const { name, control, rules, label, errors, placeholder, errorMessage, rememberMeValue } = props;
    return (
        <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        label={label}
                        value={field.value || rememberMeValue}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors}
                        placeholder={placeholder}
                    />
                )}
            />
            <FormHelperText sx={{ color: "error.main", ml: 0 }}>{errorMessage}</FormHelperText>
        </FormControl>
    );
};

export default FormTextField;