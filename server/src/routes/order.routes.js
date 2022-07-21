import express from 'express';
import orderCtrl from '../controllers/order.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/orders').post(orderCtrl.createOrders);

router.route('/orders/:userId').get(orderCtrl.listOrders, userCtrl.read);

router.param('userId', userCtrl.userByID);

export default router;
