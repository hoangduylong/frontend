const rootReducer = (state, action = {}) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

export default rootReducer;
