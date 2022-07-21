import Dough from '../models/dough.model';

const listDough = (req, res) => {
  Dough.find((err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result);
  });
};

export default { listDough };
