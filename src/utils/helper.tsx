/**
 * Regular expressions for validate email addresses
 */
export const isValidEmail = (email: any) => {
    let regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    return regex.test(email);
};

export const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
}

export const getLocalRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
}
