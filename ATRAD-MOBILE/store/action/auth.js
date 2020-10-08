export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch(Links.mLink + "login", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `action=login&format=json&txtUserName=${username}&txtPassword=${password}`,
    });

    const resData = await response.text();

    console.log(resData);

    dispatch({
      type: LOGIN,
    });
  };
};
