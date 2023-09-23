import React from 'react';
import { Button, ButtonProps as MUIButtonProps } from '@mui/material';

interface ButtonProps extends MUIButtonProps {
  title: string | any;
  sx?: any;
  variant: string | any;
  color?: any;
  Icon?: any;
  onClick?: any;
}

const MUIButton: React.FC<ButtonProps> = ({ sx, title, variant, color, children, Icon, onClick, ...props }) => {
  return (

    <Button title={title} variant={variant} color={color} sx={sx} onClick={onClick} {...props}>
      {title}
    </Button>
  );
};

export default MUIButton;