import Ingredients from '../models/ingredients.model';

const listIngredients = (req, res) => {
  Ingredients.find((err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result);
  });
};

export default { listIngredients };
