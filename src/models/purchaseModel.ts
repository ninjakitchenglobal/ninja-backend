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
  orderNumber: {
    type: Number,
  },
  stripeOrderId: {
    type: String,
  },
});

const purchaseModel = model('purchases', PurchaseSchema);

export default purchaseModel;
