const order = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return [
        ...state,
        [
          { name: action.order },
          { ingredients: action.dough },
          { price: action.price },
          { orderID: action.orderID },
        ],
      ];
    case 'REMOVE_ORDER':
      return [];
    default:
      return state;
  }
};

export default order;
