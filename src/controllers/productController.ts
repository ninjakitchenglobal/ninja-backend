//IMPORTING HELPER
import handleRequest from '../helpers/handleRequests';

//IMPORTING SERVICES
import {
  addProductService,
  getAllProductsService,
  getOneProductService,
  getRecommendationsService,
  getPopularService,
  getSomeProductsService,
  deleteProductService,
  getProductsByCategoryService,
} from '../services/productService';

export const addProduct = handleRequest(addProductService);
export const getAllProducts = handleRequest(getAllProductsService);
export const getProduct = handleRequest(getOneProductService);
export const getRecommendations = handleRequest(getRecommendationsService);
export const getPopular = handleRequest(getPopularService);
export const getSomeProducts = handleRequest(getSomeProductsService);
export const deleteProduct = handleRequest(deleteProductService);
export const getProductByCategory = handleRequest(getProductsByCategoryService);
