let initialState = {
  jobs: [],
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOBS":
      console.log(action.payload);
      return {
        ...state,
        jobs: action.payload,
      };

    default:
      return state;
  }
};
