let initialState = {
  applications: JSON.parse(localStorage.getItem("applications")) || [],
  user: JSON.parse(localStorage.getItem("user")) || [],
  company: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_APPLICATION_USER":
      console.log(action.payload);
      return {
        ...state,
        applications: action.payload,
      };

    case "UPDATE_USER":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case "UPDATE_COMPANY_INFO":
      console.log(action.payload);
      return {
        ...state,
        company: action.payload,
      };

    default:
      return state;
  }
};
