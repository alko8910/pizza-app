const setCount = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_COUNT':
      return action.count++;
    default:
      return state;
  }
};

export default setCount;
