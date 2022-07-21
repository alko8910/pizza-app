export const addDough = (dough) => {
  return {
    type: 'ADD_DOUGH',
    payload: dough,
  };
};
export const addIngredients = (ingredients) => {
  return {
    type: 'ADD_INGREDIENTS',
    payload: ingredients,
  };
};

export const addOrder = (order, dough, price, orderID) => {
  return {
    type: 'ADD_ORDER',
    order: order,
    dough: dough,
    price: price,
    orderID: orderID,
  };
};

export const removeOrder = (order) => {
  return {
    type: 'REMOVE_ORDER',
    order: order,
  };
};

export const addAdress = (address, floor) => {
  return {
    type: 'ADD_ADRESS',
    address: address,
    floor: floor,
  };
};

export const addPrice = (price) => {
  return {
    type: 'ADD_PRICE',
    price: price,
  };
};
export const addSumOfPrices = (price) => {
  return {
    type: 'ADD_SUMOFPRICES',
    price: price,
  };
};

export const addAmount = (amount) => {
  return {
    type: 'ADD_AMOUNT',
    amount: amount,
  };
};

export const addFinalOrder = (dough, ingredients, price, amount, userID) => {
  return {
    type: 'ADD_FINALORDER',
    dough: dough,
    ingredients: ingredients,
    price: price,
    amount: amount,
    userID: userID,
  };
};

export const addUserId = (userId) => {
  return {
    type: 'ADD_USERID',
    userId: userId,
  };
};
export const addFinalSum = (finalSum) => {
  return {
    type: 'ADD_FINALSUM',
    finalSum: finalSum,
  };
};
export const addCount = (count) => {
  return {
    type: 'ADD_COUNT',
    count: count,
  };
};

export const addCountTwo = (count) => {
  return {
    type: 'ADD_COUNTTWO',
    count: count,
  };
};
