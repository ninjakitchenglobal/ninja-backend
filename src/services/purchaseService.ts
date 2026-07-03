import { BadRequestError } from '../errors';
import { IParams } from '../interfaces';

//IMPORTING PURCHASE MODEL
import purchaseModel from '../models/purchaseModel';

//IMPORTING UTILS
import generateRandom8DigitNumber from '../utils/generateOrderNumber';
import transporter from '../types/nodemailer_transporter';
import {
  buyerPurchaseEmail,
  sellerPurchaseEmail,
} from '../types/emails/emailTemplates';

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
    receipt,
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
