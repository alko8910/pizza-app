import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    dough: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
  },
  {
    collection: 'orders',
  }
);
export default mongoose.model('Orders', orderSchema);
