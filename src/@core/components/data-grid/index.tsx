import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

interface DaraGridProps {
    rowsData: any;
    columnsData: any;
    pageSizee: number;
    getRowId: any;
    onRowSelectionModelChange: any;
    selectionModel: any;
}

export const DataGridTable = (props: DaraGridProps) => {
    const { selectionModel, onRowSelectionModelChange, rowsData, columnsData, pageSizee, getRowId } = props;

    return (
        <>
            <DataGrid
                autoHeight
                disableRowSelectionOnClick
                rows={rowsData}
                columns={columnsData}
                pageSize={pageSizee}
                getRowId={getRowId}
                selectionModel={selectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
            />
        </>
    );
};