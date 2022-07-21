const userId = (state = '', action) => {
  switch (action.type) {
    case 'ADD_USERID':
      return action.userId;
    default:
      return state;
  }
};

export default userId;
