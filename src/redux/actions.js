const login = (token, id) => {
  return {
    type: 'login',
    payload: {
      token,
      id,
    },
  };
};

export default login;
