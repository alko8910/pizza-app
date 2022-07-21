const setCountTwo = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_COUNTTWO':
      return action.count++;
    default:
      return state;
  }
};

export default setCountTwo;
