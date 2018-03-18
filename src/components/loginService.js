const authTokenName = "MAGIC_TOKEN";

export const isLoggedIn = () => localStorage.getItem(authTokenName);
export const logOut = () => localStorage.removeItem(authTokenName);
export const loginWithToken = token =>
  localStorage.setItem(authTokenName, token);
