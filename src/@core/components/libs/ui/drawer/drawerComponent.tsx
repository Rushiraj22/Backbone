import React, { FC, ReactNode } from 'react';
import { Drawer } from '@mui/material';
import Icon from "src/@core/components/icon";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import CustomTypography from '../typography/typography';
import MUIButton from '../button/button';
import MUIIconButton from '../iconButton/iconButton';

interface DrawerComponentProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
    drawerBoxForm: any;
    anchor: string | any;
    variant: string | any;
    sx: any;
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 4),
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default
}))


const DrawerComponent: FC<DrawerComponentProps> = ({ open, onClose, anchor, variant, sx, children, title, drawerBoxForm, ...rest }) => {
    return (
        <Drawer
            open={open}
            anchor={anchor}
            variant={variant}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            {...rest}
            sx={sx}
        >
            <Header>
                <MUIIconButton
                    icon={<Icon icon="mdi:close" fontSize={20} />}
                    onClick={onClose}
                    />
            </Header>
            <CustomTypography variant="h4" sx={{ textAlign: "center", pt: 10 }}>
                {title}
            </CustomTypography>
            {drawerBoxForm}
        </Drawer>
    );
};

export default DrawerComponent;