import React, { ReactNode } from "react";
import { Card, CardContent } from "@mui/material";

interface CardProps {
  children: ReactNode;
  sx?: any;
}

const MUICard: React.FC<CardProps> = ({ sx, children }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MUICard;