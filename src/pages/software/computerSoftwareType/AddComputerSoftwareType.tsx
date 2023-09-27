import React, { useState, useEffect } from "react";
import { UserActions } from "src/utils/helper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/app/Store";
import InputText from "src/@core/components/libs/ui/inputText/inputText";
import { useTranslation } from "react-i18next";
import DrawerComponent from "src/@core/components/libs/ui/drawer/drawerComponent";
import BoxComponent from "src/@core/components/libs/ui/muiBox/muiBox";
import CircularProgressComponent from "src/@core/components/libs/ui/CircularProgress/CircularProgress";
import MUIButton from "src/@core/components/libs/ui/button/button";
import { addComputerSoftware } from "src/redux/reducers/computerSoftwareTypeReducer";

interface SidebarAddComputerType {
    open: boolean;
    toggle: any;
    userAction: any;
    selectedRow: any;
    page: number;
    pageSize: number;
}

interface FormValues {
    name: any;
    discription: string;
}

const AddComputerSoftwareTypeDrawer = (props: SidebarAddComputerType) => {
    /**
     * Props
     */
    const { open, toggle, userAction, selectedRow } = props;

    /**
     * Hooks
     */
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Form Fields
     */
    const defaultValues = {
        name: "",
        discription: ""
    }

    const [isDisabled, setIsDisabled] = useState(false);
    const [inputValues, setInputValues] = useState<FormValues>(defaultValues);

    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    // ** Form Error
    const [errors, setErrors] = useState({
        name: "",
        discription: ""
    })

    // ** form submit event 
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors: { [key: string]: string } = {};
        Object.keys(inputValues).forEach((name: string) => {
            const error: string = validateForm(name, inputValues[name as keyof typeof inputValues]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors({ ...errors, ...validationErrors });

            return;
        }

        dispatch(addComputerSoftware(inputValues));

        setIsDisabled(false)
    }

    // ** edit button click show the row data in input text field
    useEffect(() => {
        if (userAction === UserActions.EDIT || userAction === UserActions.SHOW_DETAILS) {
            const newInputValues = {
                name: selectedRow.name ? selectedRow.name : "",
                discription: selectedRow.discription ? selectedRow.discription : "",
            };
            setInputValues(newInputValues);
        } else {
            setInputValues(defaultValues);
        }
    }, [selectedRow, userAction]);

    // ** Toggle open/close function
    const handleClose = () => {
        toggle(false);
        errors.name = "";
        errors.discription = "";
        setIsDisabled(false);
    }

    /**
     * Validation function
     * @param name 
     * @param value 
     * @returns 
     */
    const validateForm = (name: any, value: any) => {
        switch (name) {
            case "name":
                if (!value || value.trim() === "") {
                    return "Name is required";
                } else {
                    return "";
                }
            case "discription":
                if (!value || value.trim() === "") {
                    return "Discription is required";
                } else {
                    return "";
                }

            default: {
                return "";
            }
        }
    };

    /**
     * Onchange event
     * @param event 
     */
    const handleOnChange = (event: any) => {
        const { name } = event.target;
        const value = event.target.value;

        setErrors({ ...errors, [name]: validateForm(name, value) });
        setInputValues({ ...inputValues, [name]: value });
    }

    const handleClick = () => {
        setIsDisabled(!isDisabled);
    };

    return (
        <DrawerComponent
            open={open}
            anchor="right"
            variant="temporary"
            sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
            onClose={handleClose}
            title={userAction === UserActions.ADD ? "Add Computer Software" : userAction === UserActions.EDIT ? "Update Computer Software Type" : userAction === UserActions.SHOW_DETAILS ? "Computer Software Type Details" : ""}
            drawerBoxForm={<BoxComponent sx={{ p: 5, display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
                <form onSubmit={onSubmit} autoComplete="off">
                    <InputText
                        size="medium"
                        label="Name"
                        name="name"
                        type="text"
                        variant="outlined"
                        placeholder="Name"
                        id="name"
                        onChange={handleOnChange}
                        value={inputValues.name}
                        error={errors.name ? true : false}
                        errorMessage={errors.name}
                        disabled={(userAction === UserActions.SHOW_DETAILS) ? true : (userAction === UserActions.EDIT ? true : false)}
                    />
                    <InputText
                        size="medium"
                        label="Discription"
                        name="discription"
                        type="text"
                        variant="outlined"
                        placeholder="Discription"
                        id="discription"
                        onChange={handleOnChange}
                        value={inputValues.discription}
                        error={errors.discription ? true : false}
                        errorMessage={errors.discription}
                        disabled={isDisabled || userAction === UserActions.EDIT ? false : userAction === UserActions.ADD ? false : true}
                    />
                    {userAction === UserActions.SHOW_DETAILS
                        ? <BoxComponent sx={{ display: "flex", alignItems: "center" }}>
                            {isDisabled === false ?
                                <MUIButton
                                    variant="contained"
                                    color="primary"
                                    title={t("edit", "Edit")}
                                    size="large"
                                    onClick={handleClick}
                                    sx={{ mr: 3 }}
                                />
                                :
                                <MUIButton
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}
                                    title={t("update", "Update")}
                                    size="large"
                                    sx={{ mr: 3 }}
                                />
                            }
                            <MUIButton
                                title={t("cancel", "Cancel")}
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                            />
                        </BoxComponent>
                        :
                        <BoxComponent sx={{ display: "flex", alignItems: "center" }}>
                            <MUIButton
                                variant="contained"
                                color="primary"
                                title={userAction === UserActions.ADD ? (
                                    isLoading ? (
                                        "Loading..."
                                    ) : (
                                        `${t("submit", "Submit")}`
                                    )
                                ) : (
                                    isLoading ? (
                                        "Loading..."
                                    ) : (
                                        `${t("update", "Update")}`
                                    )
                                )}
                                size="large"
                                type="submit"
                                sx={{ mr: 3 }}
                                startIcon={isLoading && <CircularProgressComponent
                                    sx={{ color: "white" }} size={20}
                                />}
                            />
                            <MUIButton
                                title={t("cancel", "Cancel")}
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                            />
                        </BoxComponent>}
                </form>
            </BoxComponent>}
        >
        </DrawerComponent>
    )
}

export default AddComputerSoftwareTypeDrawer;
