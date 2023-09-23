import { DialogTitle } from '@mui/material';
import React from 'react';

interface DialogTitleProps {
    title: string;
    sx: any;
}

const MUIDialogTitle = (props: DialogTitleProps) => {
    const { sx, title } = props;
    return (
        <DialogTitle sx={sx}>{title}</DialogTitle>
    );
};

export default MUIDialogTitle;