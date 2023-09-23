import { Switch, FormControl, FormControlLabel } from '@mui/material';

interface FormValues {
  name?: string;
  onChange?: any;
  label?: string | any;
  disabled?: boolean;
  value?: any;
  sx: any;
};

const ToggleSwitch = (props: FormValues) => {
  const { name, onChange, label, disabled, value } = props;

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <FormControlLabel
        control={
          <Switch
            name={name}
            onChange={onChange}
            checked={value}
          />
        }
        label={label}
        disabled={disabled}
      />
    </FormControl>
  );
};

export default ToggleSwitch;