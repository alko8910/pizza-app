const address = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ADRESS':
      return [...state, [{ address: action.address }, { floor: action.floor }]];
    default:
      return state;
  }
};

export default address;
