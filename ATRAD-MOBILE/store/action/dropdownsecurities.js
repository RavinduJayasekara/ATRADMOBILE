import Links from "../../Links/Links";
import Watch from "../../Links/Watch";

export const GET_ALL_SECURITIES = "GET_ALL_SECURITIES";

export const fetchDropDownAllSecurities = () => {
  return async (dispatch) => {
    const response = await fetch(Links.mLink + Watch.allSecurityLink);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.text();

    let replaceString = resData.replace(/'/g, '"');
    let object = JSON.parse(replaceString);

    console.log(object.data.items);

    dispatch({
      type: GET_ALL_SECURITIES,
      allSecurities: object.data.items,
    });
  };
};
