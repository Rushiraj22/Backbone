import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import BoxComponent from "../muiBox/muiBox";
import MUIButton from "../button/button";
import { Button } from "@mui/material";

interface DeleteConfirmProps {
    open: boolean;
    handleClose: any;
    handleDelete: any;
    selectedData: any;
    contentText: string;
    title: string;
    no: string;
    yes: string;
}

const DeleteConfirmation = (props: DeleteConfirmProps) => {
    const { open, handleClose, handleDelete, selectedData, contentText, title, no, yes } = props;

    return (
        <BoxComponent>
            <Dialog
                open={open}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <MUIButton onClick={handleClose} title={no} variant={'outlined'} color="primary" />
                    <MUIButton title={yes} variant={'contained'} color="primary" onClick={() => { handleDelete(selectedData); handleClose(); } } />
                </DialogActions>
            </Dialog>
        </BoxComponent>
    )
}

export default DeleteConfirmation;
