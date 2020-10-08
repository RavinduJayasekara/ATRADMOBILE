import Links from "../../Links/Links";

export const LOGIN = "LOGIN";

export const login = () => {
  return async (dispatch) => {
    const response = await fetch(Links.mLink + "login", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "action=login&format=json&txtUserName=iot&txtPassword=Password1",
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: LOGIN, watchID: resData.watchID });
  };
};
