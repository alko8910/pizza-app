import express from 'express';
import doughCtrl from '../controllers/dough.controller';

const router = express.Router();
router.route('/dough').get(doughCtrl.listDough);

export default router;
