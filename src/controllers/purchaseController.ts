import handleRequest from '../helpers/handleRequests';

import {
  createPurchaseService,
  getPurchasesService,
} from '../services/purchaseService';

export const createPurchase = handleRequest(createPurchaseService);
export const getPurchases = handleRequest(getPurchasesService);
