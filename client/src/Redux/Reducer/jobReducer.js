let initialState = {
  jobs: [],
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };

    default:
      return state;
  }
};
