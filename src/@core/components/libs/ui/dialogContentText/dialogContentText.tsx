import { DialogContentText } from '@mui/material';
import React from 'react';

interface DialogContentTextProps {
    title: any;
    sx: any;
}

const MUIDialogContentText = (props: DialogContentTextProps) => {
    const { sx, title } = props;
    return (
        <DialogContentText sx={sx} title={title} />
    );
};

export default MUIDialogContentText;