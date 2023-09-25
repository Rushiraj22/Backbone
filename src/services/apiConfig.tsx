const BaseURL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

/**
 * Auth sections URL`s
 */
export const getSignInURL = () => `${BaseURL}/accounts/api/token/`;
export const getSignUpURL = () => `${BaseURL}/accounts/api/registration/`;
export const getResetPasswordURL = () => `${BaseURL}/accounts/api/reset-password/`;
export const getChangePasswordURL = () => `${BaseURL}/accounts/api/change-password/`;
export const getRefreshTokenURL = () => `${BaseURL}/accounts/api/token/refresh/`;
export const getBlacklistTokenURL = () => `${BaseURL}/accounts/api/token/blacklist/`;