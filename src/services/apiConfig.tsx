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

/**
 * Software section URL`s
 */

// Computer Sodtware type section url`s
export const getComputerSoftwareTypeListURL = () => `${BaseURL}/software/view-Computer-SoftwareType-list/`;
export const getAddComputerSoftwareTypeURL = () => `${BaseURL}/software/create-computer-softwareType/`;
export const getUpdateComputerSoftwareTypeURL = (id: number) => `${BaseURL}/software/update-computer-softwaretype/${id}/`;
export const getDeleteComputerSoftwareTypeURL = (id: number) => `${BaseURL}/software/delete-computer-softwareType/${id}/`;
