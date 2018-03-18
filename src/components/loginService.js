const authTokenName = "MAGIC_TOKEN";

export const isLoggedIn = () => !!getToken();
export const logOut = () => localStorage.removeItem(authTokenName);
export const getToken = () => localStorage.getItem(authTokenName);
export const loginWithToken = token =>
  localStorage.setItem(authTokenName, token);
