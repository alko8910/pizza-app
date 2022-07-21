const price = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_PRICE':
      return action.price;
    case 'ADD_SUMOFPRICES':
      return state + action.price;
    default:
      return state;
  }
};

export default price;
