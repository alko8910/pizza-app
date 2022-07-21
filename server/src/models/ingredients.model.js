import mongoose from 'mongoose';

const ingredientsShema = new mongoose.Schema(
  {
    gluten_free: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    collection: 'ingredients',
  }
);
export default mongoose.model('Ingredients', ingredientsShema);
