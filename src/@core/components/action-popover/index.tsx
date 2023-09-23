import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Icon from "src/@core/components/icon";
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import { UserActions } from "src/utils/helper";



export const RowOptions = (props: any) => {
    const { dispatch, selectionModel, handleUserAction } = props;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title='View' onClick={() => handleUserAction(selectionModel, UserActions.SHOW_DETAILS)}>
                    <IconButton size='small'>
                        <Icon icon='mdi:eye-outline' fontSize={20} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Edit'>
                    <IconButton size='small' onClick={() => handleUserAction(selectionModel, UserActions.EDIT)}>
                        <Icon icon='mdi:pencil-outline' fontSize={20} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                    <IconButton size='small' onClick={() => handleUserAction(selectionModel.code, UserActions.DELETE)}>
                        <Icon icon='mdi:delete-outline' fontSize={20} />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    )
}
