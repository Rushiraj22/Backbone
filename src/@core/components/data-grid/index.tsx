import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BoxComponent from "../libs/ui/muiBox/muiBox";
import TableHeader from "../libs/ui/tableHeader/table-header";
import MUIDivider from "../libs/ui/divider/divider";

interface DaraGridProps {
    rows: any;
    columns: any;
    pageSize?: number | any;
    getRowId: any;
    onRowSelectionModelChange?: | any;
    selectionModel: any;
    sx?: any;
    page?: number;
    paginationModel?: any;
    onPaginationModelChange?: any;
    rowCount?: number;
    pageSizeOptions?: any;
    onPageChange?: any;
    paginationMode?: any;
    handleAdd?: any;
    title?: any;
    searchlabel?: any;
    buttonName?: any;
    exportButtonTitle?: any;
    change3PL?: any;
    checkboxSelection?: any;
    rowSelectionModel?: any;
    handleButtonClick?: any;
    handlePrintLabelBtn?: any;
    printLabel?: string | null | undefined;
    showHeader?: boolean;
}

export const DataGridTable = (props: DaraGridProps) => {
    const {
        rows,
        columns,
        getRowId,
        paginationModel,
        onPaginationModelChange,
        pageSizeOptions = [10, 25, 50, 100],
        rowCount = 0,
        paginationMode = "server",
        handleAdd,
        title,
        searchlabel,
        buttonName,
        checkboxSelection,
        rowSelectionModel,
        onRowSelectionModelChange,
    } = props;

    return (
        <BoxComponent sx={{ border: "1px solid rgba(234, 234, 255, 0.12)", borderRadius: "10px" }}>
            <TableHeader
                handleAdd={handleAdd}
                title={title}
                searchlabel={searchlabel}
                buttonName={buttonName}
            />
            <MUIDivider />
            <DataGrid
                checkboxSelection={checkboxSelection}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
                pagination
                autoHeight
                disableRowSelectionOnClick
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                paginationMode={paginationMode}
                getRowId={getRowId}
                paginationModel={paginationModel}
                pageSizeOptions={pageSizeOptions}
                onPaginationModelChange={onPaginationModelChange}
                sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
            />
        </BoxComponent>

    );
};