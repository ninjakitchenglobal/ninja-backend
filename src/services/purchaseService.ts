import { BadRequestError } from '../errors';
import { IParams } from '../interfaces';

//IMPORTING MODELS
import purchaseModel from '../models/purchaseModel';
import userModel from '../models/userModel';

//IMPORTING UTILS
import generateRandom8DigitNumber from '../utils/generateOrderNumber';
import transporter from '../types/nodemailer_transporter';
import {
  buyerPurchaseEmail,
  sellerPurchaseEmail,
} from '../types/emails/emailTemplates';

import Stripe from 'stripe';

//CREATING A PURCHASE
export const createPurchaseService = async (params: IParams) => {
  const { email, address, receipt } = params.data;

  if (!email || !address || !receipt) {
    throw new BadRequestError('Incomplete purchase details');
  }

  const orderNumber = generateRandom8DigitNumber();

  await purchaseModel.create({
    email,
    address,
    orderNumber,
  });

  //SENDING OUT THE EMAILS
  const buyerEmailInfo = buyerPurchaseEmail(email, orderNumber, address);
  const sellerEmailInfo = sellerPurchaseEmail(
    'ninjakitchenglobe@gmail.com',
    address,
    orderNumber,
  );

  await Promise.all([
    transporter.sendMail(buyerEmailInfo),
    transporter.sendMail(sellerEmailInfo),
  ]);

  return {
    success: true,
    message: 'Successful purchase',
    data: null,
  };
};

export const getPurchasesService = async () => {
  const purchases = await purchaseModel.find();

  return {
    success: true,
    message: 'Here are the product purchases',
    data: purchases,
  };
};

//STRIPE PURCHASE FUNCTIONALITY
export const createStripePurchaseService = async (params: IParams) => {
  const {
    price,
    quantity,
    name,
    user,
    address,
  }: {
    price: number;
    quantity: number;
    name: string;
    user: string;
    address: string;
  } = params.data;

  //GETTING THE USER
  const purchasingUser = await userModel.findById(user);
  if (!purchasingUser) {
    throw new BadRequestError('Invalid request!');
  }

  const { email } = purchasingUser;

  const stripe = Stripe(process.env.STRIPE_DEV_KEY!);
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: price * 100,
          product_data: {
            name,
          },
        },
        quantity,
      },
    ],
    mode: 'payment',
    success_url: 'https://www.ninjakitchenglobal.com/payment-confirmation',
  });

  //SAVING THE PURCHASE TO THE DATABASE
  const orderNumber = generateRandom8DigitNumber();

  await purchaseModel.create({
    email,
    address,
    orderNumber,
    stripeOrderId: session.id,
  });

  //SENDING OUT THE EMAILS
  const buyerEmailInfo = buyerPurchaseEmail(email, orderNumber, address);
  const sellerEmailInfo = sellerPurchaseEmail(
    'ninjakitchenglobe@gmail.com',
    address,
    orderNumber,
  );

  await Promise.all([
    transporter.sendMail(buyerEmailInfo),
    transporter.sendMail(sellerEmailInfo),
  ]);

  return {
    success: true,
    message: 'Checkout session is ready',
    data: {
      checkoutUrl: session.url,
    },
  };
};
