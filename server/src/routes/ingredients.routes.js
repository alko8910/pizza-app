import express from 'express';
import ingredientsCtrl from '../controllers/ingredients.controller';

const router = express.Router();
router.route('/ingredients').get(ingredientsCtrl.listIngredients);

export default router;
