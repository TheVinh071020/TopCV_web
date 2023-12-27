let initialState = {
  companys: [],
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COMPANY":
      console.log(action.payload);
      return {
        ...state,
        companys: action.payload,
      };
    default:
      return state;
  }
};
