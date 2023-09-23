import { DialogContent } from '@mui/material';
import React, { ReactNode } from 'react';

interface DialogContentProps {
    children: ReactNode;
    sx: any;
}

const MUIDialogContent = (props: DialogContentProps) => {
    const { sx, children } = props;
    return (
        <DialogContent sx={sx}>{children}</DialogContent>
    );
};

export default MUIDialogContent;