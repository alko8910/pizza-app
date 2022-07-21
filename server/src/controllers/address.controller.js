import Address from '../models/address.model';
import User from '../models/user.model';

const createAddress = async (req, res, next) => {
  const { address, floor, userId } = req.body;

  let newAddress = new Address({ address, floor });
  try {
    await newAddress.save();
  } catch (error) {
    res.status(500).json({ message: 'Could not save address' });
    const err = new Error('Could not save address', 500);
    return next(err);
  }
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  user.addresses.push(newAddress);
  await user.save();

  try {
    user = await User.findById(userId).populate('addresses');
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ address: newAddress, data: user.addresses });
};

const listAddress = async (req, res, next) => {
  const userId = req.url.match(/^\/address\/(.+)/)[1];
  let user;
  try {
    user = await User.findById(userId).populate('addresses');
  } catch (error) {
    return next(error);
  }
  res.json({ data: user.addresses });
};

const removeAddress = (req, res, next) => {
  let address = req.addresses;
  address.remove((err, deletedAddress) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(deletedAddress);
  });
};
const addressByID = (req, res, next, id) => {
  Address.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({ error: 'Address not found' });
    req.addresses = user;
    next();
  });
};

export default { createAddress, listAddress, removeAddress, addressByID };
