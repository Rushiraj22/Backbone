/**
 * Regular expressions for validate email addresses
 */
export const isValidEmail = (email: any) => {
    let regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    return regex.test(email);
};

/**
 * Save access token to localStorage
 * @param key 
 * @param token 
 */
export const saveAccessToken = (key: any, token: any) => {
    localStorage.setItem(key, token);
}

/**
 * get access token to localStorage
 * @returns 
 */
export const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
}

/**
 * Save refresh token to localStorage
 * @param key 
 * @param token 
 */
export const saveRefreshToken = (key: any, token: any) => {
    localStorage.setItem(key, token);
}

/**
 * get access token to localStorage
 * @returns 
 */
export const getLocalRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
}

export const UserActions = {
    SHOW_DETAILS: 1,
    ADD: 2,
    EDIT: 3,
    DELETE: 4,
};