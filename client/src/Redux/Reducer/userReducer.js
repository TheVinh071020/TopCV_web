let initialState = {
  applications: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_APPLICATION_USER":
      console.log(action.payload);
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state;
  }
};
