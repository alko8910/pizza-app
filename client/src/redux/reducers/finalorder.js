const finalorder = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FINALORDER':
      return [
        ...state,
        [
          { dough: action.dough },
          { ingredients: action.ingredients },
          { price: action.price },
          { amount: action.amount },
        ],
      ];

    default:
      return state;
  }
};

export default finalorder;
