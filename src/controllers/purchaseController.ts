import handleRequest from '../helpers/handleRequests';

import {
  createPurchaseService,
  getPurchasesService,
  createStripePurchaseService,
} from '../services/purchaseService';

export const createPurchase = handleRequest(createPurchaseService);
export const getPurchases = handleRequest(getPurchasesService);
export const createStripePurchase = handleRequest(createStripePurchaseService);
