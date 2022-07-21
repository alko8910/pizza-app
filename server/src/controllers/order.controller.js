import Orders from './../models/order.model';
import User from '../models/user.model';
import FullOrder from '../models/fullOrder.model';

const createOrders = async (req, res, next) => {
  const { data, userId } = req.body;

  const newFullOrder = new FullOrder();
  for (let i = 0; i < data.length; i++) {
    let newOrder = new Orders({
      dough: data[i][0].dough,
      ingredients: data[i][1].ingredients,
      price: data[i][2].price,
      amount: data[i][3].amount,
    });
    try {
      await newOrder.save();
    } catch (error) {
      res.status(500).json({ message: 'Could not save order' });
      const err = new Error('Could not save order', 500);
      return next(err);
    }
    newFullOrder.fullOrders.push(newOrder._id);
  }
  await newFullOrder.save();
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  user.orders.push(newFullOrder._id);
  await user.save();

  try {
    user = await User.findById(userId).populate({
      path: 'orders',
      populate: { path: 'fullOrders' },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: user.orders });
};

const listOrders = async (req, res, next) => {
  const userId = req.url.match(/^\/orders\/(.+)/)[1];
  let user;
  try {
    user = await User.findById(userId).populate({
      path: 'orders',
      populate: { path: 'fullOrders' },
    });
  } catch (error) {
    return next(error);
  }
  res.json({ data: user.orders });
};

export default { createOrders, listOrders };
