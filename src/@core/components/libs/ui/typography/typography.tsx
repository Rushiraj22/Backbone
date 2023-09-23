import React, { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface MyTypographyProps extends TypographyProps {
  children: ReactNode;
  href?: any;
  component?: any;
}

const CustomTypography = (props: MyTypographyProps) => {
  const { children, href, component, ...rest } = props;

  return <Typography component={component} href={href} {...rest}>{children}</Typography>;
};

export default CustomTypography;
