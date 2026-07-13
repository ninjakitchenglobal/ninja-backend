import { Router } from 'express';

const purchaseRouter = Router();

//IMPORTING CONTROLLERS
import {
  createPurchase,
  getPurchases,
  createStripePurchase,
} from '../controllers/purchaseController';

purchaseRouter.post('/create-purchase', createPurchase);
purchaseRouter.get('/get-purchases', getPurchases);
purchaseRouter.post('/create-stripe-purchase', createStripePurchase);

export default purchaseRouter;
