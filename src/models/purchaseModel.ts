import { Schema, model } from 'mongoose';
import { IProductDetail } from '../interfaces';

const PurchaseSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  address: {
    type: String,
    require: [true, 'Please provide your shipping address'],
  },
  receipt: {
    type: String,
    required: [true, 'Buyer receipt not provided, verification failed'],
  },
  orderNumber: {
    type: Number,
  },
});

const purchaseModel = model('purchases', PurchaseSchema);

export default purchaseModel;
