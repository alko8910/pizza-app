import mongoose from 'mongoose';

const addressShema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    floor: {
      type: Number,
    },
  },
  {
    collection: 'address',
  }
);
export default mongoose.model('Address', addressShema);
