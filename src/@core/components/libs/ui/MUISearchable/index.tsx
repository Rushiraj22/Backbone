import React, { FC } from "react";
import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutocompleteWrapperProps {
    options: string[];
    label: string;
    name?: string;
    searchInput?: any;
    handleInputChange: any;
    handleSelectChange: any;
    selectedValue?: any;
}

const MUISearchable: FC<AutocompleteWrapperProps> = ({
    name,
    options,
    label,
    searchInput,
    selectedValue,
    handleInputChange,
    handleSelectChange,
}) => {
    return (
        <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            options={options}
            onChange={handleSelectChange}
            value={selectedValue}
            renderInput={(params) =>
                <TextField
                    value={searchInput}
                    onChange={handleInputChange}
                    name={name}
                    {...params}
                    label={label}
                />
            }
        />
    );
};

export default MUISearchable;