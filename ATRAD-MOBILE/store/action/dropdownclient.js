import Links from "../../Links/Links";
import Portfolio from "../../Links/Portfolio";

export const GET_DROPDOWN_DETAILS = "GET_DROPDOWN_DETAILS";

export const fetchDropDownDetails = () => {
  return async (dispatch) => {
    const response = await fetch(Links.mLink + Portfolio.getUserDetailsLink);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.text();

    let replaceString = resData.replace(/'/g, '"');
    let object = JSON.parse(replaceString);

    // const dropDownClients = [];

    // for (const key in object.data.userids) {
    //   dropDownClients.push({
    //     label:
    //       object.data.userids[key].clientCode +
    //       " (" +
    //       object.data.userids[key].initials +
    //       object.data.userids[key].lastName +
    //       ")",
    //     value: dropDownElements[key].clientCode,
    //   });
    // }

    dispatch({
      type: GET_DROPDOWN_DETAILS,
      dropDownDetails: object.data.userids,
    });
  };
};
