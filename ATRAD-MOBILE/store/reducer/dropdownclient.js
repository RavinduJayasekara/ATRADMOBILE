import { GET_DROPDOWN_DETAILS } from "../action/dropdownsecurities";

const initialState = {
  clientDetails: [],
};

const dropdownclientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DROPDOWN_DETAILS:
      return {
        clientDetails: action.dropDownDetails,
      };
  }
  return state;
};

export default dropdownclientReducer;
