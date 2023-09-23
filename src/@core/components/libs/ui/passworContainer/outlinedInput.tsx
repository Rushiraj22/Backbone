import React, { useState, ChangeEvent } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Icon } from '@iconify/react';

interface PasswordInputProps {
  label: string;
  name: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string | any;
  error: any;
  errorMessage?: any;
  disabled?: any;
}

const OutlinedInputPassword: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  errorMessage,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <InputLabel htmlFor={`auth-login-v2-${name}`} error={error}>{label}</InputLabel>
      <OutlinedInput
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        error={!!error}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ color: 'error.main', ml: 0 }}>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default OutlinedInputPassword;