import { Router } from 'express';

const purchaseRouter = Router();

//IMPORTING CONTROLLERS
import {
  createPurchase,
  getPurchases,
} from '../controllers/purchaseController';

purchaseRouter.post('/create-purchase', createPurchase);
purchaseRouter.get('/get-purchases', getPurchases);

export default purchaseRouter;
