import { CardHeader } from '@mui/material';
import React from 'react';

interface CardHeaderProps {
    titleTypographyProps?: any;
    subheader?: string;
    title?: any;
    sx?: any;
}

const MUICardHeader = (props: CardHeaderProps) => {
    const {title, sx, titleTypographyProps, subheader} = props;
    return (
        <CardHeader titleTypographyProps={titleTypographyProps} subheader={subheader} title={title} sx={sx}></CardHeader>
    );
};

export default MUICardHeader;
