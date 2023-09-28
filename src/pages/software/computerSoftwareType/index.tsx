import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGridTable } from "src/@core/components/data-grid";
import { AppDispatch } from "../../../redux/app/Store";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import MUIGrid from "src/@core/components/libs/ui/muiGrid/muiGrid";
import withLoader from "src/@core/components/libs/ui/loader/withLoader";
import { deleteComputerSoftwareType, fetchComputerSoftwareType, getComputerSoftwareTypeList, getLoadingState } from "src/redux/reducers/computerSoftwareTypeReducer";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { RowOptions } from "src/@core/components/action-popover";
import AddComputerSoftwareTypeDrawer from "./AddComputerSoftwareType";
import { UserActions } from "src/utils/helper";
import DeleteConfirmation from "src/@core/components/libs/ui/deleteConfirm/deleteConfirm";

interface computerSoftwareProps {
    setLoading?: boolean | any;
}

const ComputerSoftwareType: React.FC = (props: computerSoftwareProps) => {
    const { setLoading } = props
    const dispatch = useDispatch<AppDispatch>();
    const computerSoftwareTypeList = useSelector(getComputerSoftwareTypeList);
    let viewComputerSoftwareList = computerSoftwareTypeList?.results;

    if (!Array.isArray(viewComputerSoftwareList)) {
        viewComputerSoftwareList = [];
    }

    useEffect(() => {
        dispatch(fetchComputerSoftwareType());
    }, []);

    const [addComputerTypeOpen, setAddComputerTypeOpen] = useState<boolean>(false);
    const toggleAddComputerSoftwareDrawer = (value: any) => {
        setAddComputerTypeOpen(value)
    }

    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);

    const [computerTypeAction, setComputerTypeAction] = useState(UserActions.ADD);

    // ** UserActions Cases
    const handleAction = (data: any, action: any) => {
        switch (action) {
            case UserActions.ADD:
                setAddComputerTypeOpen(true);
                setComputerTypeAction(UserActions.ADD);
                break;
            case UserActions.DELETE:
                handleComputerSoftwareTypeDeletion(data);
                break;
            default:
                break;
        }
    };

    const handleActions = (data: any, action: any) => {
        handleAction(data, action);
    };

    const [selectedComputerSoftwareType, setSelectedComputerSoftwareType] = useState();

    const handleComputerSoftwareTypeDeletion = (data: any) => {
        setSelectedComputerSoftwareType(data);
    };

    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddComputerSoftwareType = () => {
        handleAction(null, UserActions.ADD);
    }

    const handleDeleteComputerSoftware = (data: any) => {
        dispatch(deleteComputerSoftwareType(data.id))
    }

    const isLoading = useSelector(getLoadingState);

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading]);

    const columns: GridColDef[] = [
        {
            flex: 0.2,
            minWidth: 250,
            field: "name",
            headerName: "Name",
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: "discription",
            headerName: "Discription",
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: "actions",
            headerName: "Actions",
            align: "left",
            renderCell: ({ row }: any) => <RowOptions
                handleClickOpen={handleClickOpen}
                handleUserAction={handleActions}
                selectionModel={row}
            />
        }
    ]

    return (
        <MUIGrid item xs={12}>
            <BoxComponent sx={{ border: "1px solid rgba(76, 78, 100, 0.12)", borderRadius: "10px" }}>
                <DataGridTable
                    rows={viewComputerSoftwareList}
                    columns={columns}
                    getRowId={(row: any) => row.id}
                    onRowSelectionModelChange={undefined}
                    selectionModel={undefined}
                    rowCount={undefined}
                    paginationModel={undefined}
                    onPaginationModelChange={undefined}
                    handleAdd={handleAddComputerSoftwareType}
                    title={"Computer Software Type List"}
                    searchlabel={"Search"}
                    buttonName={"Add Computer Software"}
                />
                <AddComputerSoftwareTypeDrawer
                    toggle={toggleAddComputerSoftwareDrawer}
                    open={addComputerTypeOpen}
                    userAction={computerTypeAction}
                    selectedRow={selectedRow}
                    page={1}
                    pageSize={10}
                />
                <DeleteConfirmation
                    title="Delete computer software type"
                    contentText="Are you sure you want to delete computer software type?"
                    no="No"
                    yes="Yes"
                    selectedData={selectedComputerSoftwareType}
                    handleDelete={handleDeleteComputerSoftware}
                    open={open}
                    handleClose={handleClose}
                />
            </BoxComponent>
        </MUIGrid>
    );
}

export default withLoader(ComputerSoftwareType);
