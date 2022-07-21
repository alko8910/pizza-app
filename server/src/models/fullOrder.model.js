import mongoose from 'mongoose';

const fullOrderSchema = new mongoose.Schema(
  {
    fullOrders: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Orders',
      },
    ],
  },
  {
    collection: 'fullOrders',
  }
);
export default mongoose.model('FullOrders', fullOrderSchema);
