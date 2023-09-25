import axiosObj from "src/services/api";
import toast from "react-hot-toast";
import { getBlacklistTokenURL, getChangePasswordURL, getRefreshTokenURL, getResetPasswordURL, getSignUpURL } from "src/services/apiConfig";
import Router from "next/router";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalRefreshToken } from "src/utils/helper";

interface RegisterFormValues {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | number;
    password: string | number | any;
    confirm_password: string | number | any;
};

interface AuthState {
    isLoading: boolean;
    error: {
        message: string;
        code: string;
    };
}

/**
 * Decared initial state
 */
const initialState: AuthState = {
    isLoading: false,
    error: {
        message: "",
        code: "",
    },
};

/**
 * Register User API Call
 * @param formValues 
 */
export const RegisterUser = createAsyncThunk(
    "/registration",
    async (formValues: RegisterFormValues) => {
        const parameters = {
            username: formValues.username,
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            phone: formValues.phone,
            password: formValues.password,
            confirm_password: formValues.confirm_password
        };
        try {
            const response = await axiosObj.post(getSignUpURL(), parameters);
            if (response.status === 200) {
                toast.success("User Added Successfully.");
            }
        } catch (error: any) {
            toast.error("error");
        }
    }
);

/**
 * Reset Password API Call 
 * @param formValues 
 */
export const ResetPassword = createAsyncThunk(
    "/reset-password",
    async (formValues: any) => {
        const parameters = {
            email: formValues.email
        };
        try {
            const response = await axiosObj.post(getResetPasswordURL(), parameters);
            if (response.data.code === 200) {
                toast.success(response.data.message);
                Router.push({
                    pathname: "change-password",
                    query: { uuid: response.data.data.uuid },
                });
            } if (response.data.status === "failure") {
                toast.error(response.data.error.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.email);
        }
    }
);

/**
 * Change Password API Call 
 * @param formValues 
 */
export const ChangePassword = createAsyncThunk(
    "/change-password",
    async (formValues: any) => {
        const parameters = {
            uuid: formValues.uuid,
            otp: formValues.inputValues.otp,
            new_password: formValues.inputValues.new_password
        };
        console.log("parameters", parameters);
        try {
            const response = await axiosObj.put(getChangePasswordURL(), parameters);
            console.log("response", response);
            if (response.data.code === 200) {
                toast.success(response.data.message);
            } if (response.data.status === "failure") {
                toast.error(response.data.error.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.non_field_errors);
        }
    }
);

/**
 * Refresh Token API Call 
 */
export const refreshToken = () => {
    return axiosObj.post(getRefreshTokenURL(), {
        refresh: getLocalRefreshToken(),
    });
};

/**
 * TokenBlackList API Call
 */
export const TokenBlackList = async (token: any) => {
    console.log("token", token);
    const parameters = {
        refresh: token
    };
    console.log("parameters", parameters);
    try {
        const response = await axiosObj.post(getBlacklistTokenURL(), parameters);
        console.log("response", response);
        if (response.status === 200) {
            Router.push("/login");
        }
    } catch (error: any) {
        throw error;
    }
}


/**
 * Define the slice using createSlice from @reduxjs/toolkit 
 */
const AuthSlice = createSlice({
    name: "authReducerState",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /**
             * register user cases like (pending, fulfilled, rejected)
             */
            .addCase(RegisterUser.pending, (state: AuthState) => {
                state.isLoading = true;
            })

            .addCase(RegisterUser.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(RegisterUser.rejected, (state: AuthState) => {
                state.isLoading = false;
            })

            /**
             * Reset Password cases like (pending, fulfilled, rejected)
             */
            .addCase(ResetPassword.pending, (state: AuthState) => {
                state.isLoading = true;
            })

            .addCase(ResetPassword.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(ResetPassword.rejected, (state: AuthState) => {
                state.isLoading = false;
            })

            /**
             * Change Password cases like (pending, fulfilled, rejected)
             */
            .addCase(ChangePassword.pending, (state: AuthState) => {
                state.isLoading = true;
            })

            .addCase(ChangePassword.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(ChangePassword.rejected, (state: AuthState) => {
                state.isLoading = false;
            })
    },
});

export const getLoadingState = (state: any) => state.authReducerState.isLoading;

/**
 * Export the reducer
 */
export default AuthSlice.reducer;
