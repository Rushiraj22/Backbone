import { Dialog } from '@mui/material';
import React, { ReactNode } from 'react';

interface DialogProps {
    children?: ReactNode;
    open?: boolean | any;
    onClose?: any;
    sx?: any;
}

const MUIDialog = (props: DialogProps) => {
    const { open, onClose, sx, children } = props;
    return (
        <Dialog open={open} onClose={onClose} sx={sx}>{children}</Dialog>
    );
};

export default MUIDialog;
