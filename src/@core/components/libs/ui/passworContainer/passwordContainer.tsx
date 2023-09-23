import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { Icon } from '@iconify/react';
import { Controller } from "react-hook-form";

interface PasswordInputProps {
    name: string;
    label: string;
    control: any;
    rules: any;
    errors: any;
    errorMessage?: any;
    rememberMeValue: boolean;
    placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    label,
    control,
    rules,
    errors,
    errorMessage,
    rememberMeValue,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={name} error={Boolean(errors[name])}>
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <OutlinedInput
                        value={field.value || rememberMeValue}
                        onBlur={field.onBlur}
                        label={label}
                        onChange={field.onChange}
                        id={name}
                        error={Boolean(errors[name])}
                        placeholder={placeholder}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )}
            />
            <FormHelperText sx={{ color: "error.main", ml: 0 }}>{errorMessage}</FormHelperText>
        </FormControl>
    );
};

export default PasswordInput