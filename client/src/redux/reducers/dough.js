const dough = (state = '', action) => {
  switch (action.type) {
    case 'ADD_DOUGH':
      return action.payload;
    default:
      return state;
  }
};

export default dough;
