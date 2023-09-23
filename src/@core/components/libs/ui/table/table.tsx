import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell } from '@mui/material';
interface TableProps {
  columns: any;
}

const MUITable = (props: TableProps) => {
  const { columns } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        {columns.map((column: any) => (
          <TableRow>
            <TableCell align="left">{column.product_sku}</TableCell>
            <TableCell align="right">{column.product_description}</TableCell>
            <TableCell align="right">{column.item_quantity}</TableCell>
          </TableRow>
          ))}
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default MUITable;