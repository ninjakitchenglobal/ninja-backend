import { BadRequestError } from '../errors';
import { IParams, IProductDetail } from '../interfaces';

//IMPORTING NEEDED MODELS
import productModel from '../models/productModel';

export const addProductService = async (params: IParams<IProductDetail>) => {
  const { title, description, price, category, picture } = params.data;

  if (!title || !description || !price || !category || !picture) {
    throw new BadRequestError('Please provide the complete product details');
  }

  await productModel.create({
    title,
    description,
    price,
    category,
    picture,
  });

  return {
    success: true,
    message: 'Product added successfully',
    data: null,
  };
};

export const getAllProductsService = async () => {
  const allProducts = await productModel.find();

  return {
    success: true,
    message: 'Here are the products',
    data: allProducts,
  };
};

export const getOneProductService = async (params: IParams) => {
  const { productId } = params.query;

  const product = await productModel.findOne({ _id: productId });

  if (!product) {
    throw new BadRequestError('The requested product is not available');
  }

  return {
    success: true,
    message: 'Here is the product',
    data: product,
  };
};

export const getRecommendationsService = async () => {
  const recommendations = await productModel.find({
    category: 'recommendation',
  });

  return {
    success: true,
    message: 'Here are the recommendations',
    data: recommendations,
  };
};

export const getPopularService = async () => {
  const popular = await productModel.find({ category: 'popular' });

  return {
    success: true,
    message: 'Here are the recommendations',
    data: popular,
  };
};

export const getProductsByCategoryService = async (params: IParams) => {
  const { productCategory } = params.query;

  const products = await productModel.find({ category: productCategory });

  return {
    success: true,
    message: "We've fetched the products",
    data: products,
  };
};

export const getSomeProductsService = async (params: IParams) => {
  const { productIds } = params.query;

  const individualIds: string[] = productIds.split(',');

  if (!individualIds.length) {
    return {
      success: true,
      message: 'No products in cart',
      data: [],
    };
  }

  const products = await productModel.find({ _id: { $in: individualIds } });

  return {
    success: true,
    message: 'Products retrieved',
    data: products,
  };
};

export const deleteProductService = async (params: IParams) => {
  const { productId } = params.query;

  await productModel.findOneAndDelete({ _id: productId });

  return {
    success: true,
    message: 'Product deleted',
    data: null,
  };
};
