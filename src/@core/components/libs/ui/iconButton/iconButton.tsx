import React, { ReactNode } from "react";
import { IconButton } from "@mui/material";

interface IconButtonProps {
  icon?: any;
  href?: any;
  component?: any;
  sx?: any;
  onClick?: any;
  onMouseDown?: (e: any) => any;
  arialabel?: any;
  size?: any;
}

const MUIIconButton = (props: IconButtonProps) => {
  const { href,  component, sx, onClick, icon, onMouseDown, arialabel, size } = props;
  return (
    <IconButton href={href} size={size} component={component} sx={sx} onClick={onClick} onMouseDown={onMouseDown} aria-label={arialabel}>
      {icon}
    </IconButton>
    
  );
};

export default MUIIconButton;