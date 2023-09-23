import { DialogActions } from '@mui/material';
import React, { ReactNode } from 'react';

interface DialogActionsProps {
    children: ReactNode;
    sx: any;
}

const MUIDialogActions = (props: DialogActionsProps) => {
    const { sx, children } = props;
    return (
        <DialogActions sx={sx}>{children}</DialogActions>
    );
};

export default MUIDialogActions;