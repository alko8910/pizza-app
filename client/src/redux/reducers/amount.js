const setAmount = (state = [], action) => {
  switch (action.type) {
    case 'ADD_AMOUNT':
      return action.amount;
    default:
      return state;
  }
};

export default setAmount;
