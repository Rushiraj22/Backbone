import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosObj from "src/services/api";
import { getAddComputerSoftwareTypeURL, getComputerSoftwareTypeListURL, getDeleteComputerSoftwareTypeURL, getUpdateComputerSoftwareTypeURL } from "src/services/apiConfig";


/**
 * Define the initialstate interface
 */
interface ComputerSoftwareTypeState {
    computerSoftwareTypeList: any[];
    isLoading: boolean;
    error: {
        message: string;
        code: string;
    };
}

/**
 * Define the initialstate
 */
const initialState: ComputerSoftwareTypeState = {
    computerSoftwareTypeList: [],
    isLoading: false,
    error: {
        message: "",
        code: "",
    },
};

/**
 * fetch computer software type list
 */
export const fetchComputerSoftwareType = createAsyncThunk(
    "/software/view-Computer-SoftwareType-list",
    async () => {
        try {
            const response = await axiosObj.get(getComputerSoftwareTypeListURL());
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

/** 
 * Add Computer software type
 */
export const addComputerSoftware = createAsyncThunk(
    "/software/create-computer-softwareType",
    async (formValues: any) => {
        const parameters = {
            name: formValues.name,
            discription: formValues.discription,
        };
        try {
            const response = await axiosObj.post(getAddComputerSoftwareTypeURL(), parameters);
            if (response.status === 200) {
                toast.success(response.data.message);
            }
            return response;
        } catch (error: any) {
            toast.error(error.response.data.name);
        }
    }
);

/** 
 * Delete Computer software type
 */
export const deleteComputerSoftwareType = createAsyncThunk(
    "/software/delete-computer-softwareType/id",
    async (id: number) => {
        try {
            const response = await axiosObj.delete(getDeleteComputerSoftwareTypeURL(id));
            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    }
);

/**
 * Define the slice using createSlice from @reduxjs/toolkit 
 */
const computerSoftwareTypeSlice = createSlice({
    name: "computerSoftwareType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComputerSoftwareType.pending, (state: ComputerSoftwareTypeState) => {
                state.isLoading = true;
            })

            .addCase(fetchComputerSoftwareType.fulfilled, (state: ComputerSoftwareTypeState, action: PayloadAction<any>) => {
                state.computerSoftwareTypeList = action.payload;
                state.isLoading = false;
            })

            .addCase(fetchComputerSoftwareType.rejected, (state: ComputerSoftwareTypeState) => {
                state.isLoading = false;
                state.computerSoftwareTypeList = [];
            })

            .addCase(addComputerSoftware.pending, (state: ComputerSoftwareTypeState) => {
                state.isLoading = true;
            })

            .addCase(addComputerSoftware.fulfilled, (state: ComputerSoftwareTypeState, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(addComputerSoftware.rejected, (state: ComputerSoftwareTypeState) => {
                state.isLoading = false;
            })
    },
});

export const getComputerSoftwareTypeList = (state: any) => state.computerSoftwareType.computerSoftwareTypeList;
export const getLoadingState = (state: any) => state.computerSoftwareType.isLoading;

/**
 * Export the reducer
 */
export default computerSoftwareTypeSlice.reducer;

