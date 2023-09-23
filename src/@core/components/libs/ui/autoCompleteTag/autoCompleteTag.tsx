import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";

interface AutocompleteTagsProps {
  tags: any[];
  setTags: any;
  placeholder: string;
  label: string;
  variant: string;
  id: any;
  name?: string;
  onChange?: any;
  value?: any;
  disabled?: any;
}

const AutocompleteTags: React.FC<AutocompleteTagsProps> = ({ tags, setTags, placeholder, label, variant, id, name, onChange, value, disabled }) => {
  return (
    <div>
      <Autocomplete
        multiple
        id={id}
        fullWidth
        options={[]}
        freeSolo
        value={value}
        disabled={disabled}
        onChange={(event: any, newTags: any) => {
          setTags(newTags);
        }}
        renderTags={(value: any, getTagProps: any) =>
          value.map((option: any, index: any) => (
            <Chip variant={variant} label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default AutocompleteTags;