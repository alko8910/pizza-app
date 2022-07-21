import baseUrl from '../config';

const create = (order) => {
  return fetch(`${baseUrl}/api/orders/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, user) => {
  return fetch(`${baseUrl}/api/orders/${params.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const listDough = () => {
  return fetch(`${baseUrl}/dough`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const listIngredients = () => {
  return fetch(`${baseUrl}/ingredients`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const listOrders = (params) => {
  return fetch(`${baseUrl}/orders/${params}`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const listAddress = (params) => {
  return fetch(`${baseUrl}/address/${params}`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const removeAddress = (params) => {
  return fetch(`${baseUrl}/address/${params}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export {
  listDough,
  listIngredients,
  listOrders,
  create,
  update,
  listAddress,
  removeAddress,
};
