import mongoose from 'mongoose';

// Standard response interface with generic data type
export default interface IProductDetail<T = any> {
  title: string;
  description: string;
  price: number;
  category: string;
  picture: string;
}
