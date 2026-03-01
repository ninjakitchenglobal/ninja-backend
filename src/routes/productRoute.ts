import { Router } from 'express';

//IMPORTING CONTROLLERS
import {
  addProduct,
  getAllProducts,
  getProduct,
  getRecommendations,
  getPopular,
  getSomeProducts,
  deleteProduct,
  getProductByCategory,
} from '../controllers/productController';

const productRouter = Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/get-all-products', getAllProducts);
productRouter.get('/get-product/:productId', getProduct);
productRouter.get('/get-popular', getPopular);
productRouter.get('/get-recommendations', getRecommendations);
productRouter.get('/get-particular-products', getSomeProducts);
productRouter.delete('/delete-product/:productId', deleteProduct);
productRouter.get(
  '/get-product-by-category/:productCategory',
  getProductByCategory,
);

export default productRouter;
