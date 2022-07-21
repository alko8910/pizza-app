import express from 'express';
import addressCtrl from '../controllers/address.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();
router.route('/address').post(addressCtrl.createAddress);

router.route('/address/:userId').get(addressCtrl.listAddress, userCtrl.read);

router.route('/address/:addressId').delete(addressCtrl.removeAddress);

router.param('addressId', addressCtrl.addressByID);
router.param('userId', userCtrl.userByID);

export default router;
