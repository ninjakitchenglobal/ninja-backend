import { Schema, model } from 'mongoose';
import { IProductDetail } from '../interfaces';

const ProductSchema = new Schema<IProductDetail>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

const productModel = model('products', ProductSchema);

export default productModel;
