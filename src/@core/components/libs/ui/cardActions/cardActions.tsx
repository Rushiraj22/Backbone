import CardActions from '@mui/material/CardActions';
import React, { ReactNode } from 'react';

interface CardActionsProps {
    // props...
    children: ReactNode;
    sx: any;
}

const MUICardActions = (props: CardActionsProps) => {
    const { children, sx } = props;
    return (
        <CardActions sx={sx}>{children}</CardActions> 
    );
};

export default MUICardActions;
