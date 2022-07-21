const ingredients = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INGREDIENTS':
      return action.payload;

    default:
      return state;
  }
};

export default ingredients;
