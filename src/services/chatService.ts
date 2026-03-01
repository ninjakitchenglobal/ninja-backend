//IMPORTING TYPES AND INTERFACES
import { BadRequestError } from '../errors';
import { IParams } from '../interfaces';
import { Types } from 'mongoose';

//IMPORTING MODELS
import chatModel from '../models/chatModel';
import productModel from '../models/productModel';
import { IServiceResponse } from '../interfaces/IServiceResponse';

type ChatServiceData = {
  chatId: Types.ObjectId;
  messages: typeof chatModel.schema.obj.messages;
  products: any[];
  paymentOption: string;
};

export const createNewChatService = async (
  params: IParams,
): Promise<IServiceResponse<ChatServiceData>> => {
  const { productIds, buyerId, sellerId, chatId, paymentOption } = params.data;

  const products = await productModel.find({ _id: { $in: productIds } });

  if (!products) {
    throw new BadRequestError(
      'There no products selected, cannot proceed with payment',
    );
  }

  if (!chatId) {
    const newChat = await chatModel.create({
      buyerId,
      sellerId,
      products: productIds,
      paymentOption,
      messages: [],
    });

    return {
      success: true,
      message: 'Chat created!',
      data: {
        chatId: newChat._id,
        messages: newChat.messages,
        products,
        paymentOption: newChat.paymentOption,
      },
    };
  }

  const chat = await chatModel.findOne({ _id: chatId });

  if (!chat) {
    throw new BadRequestError(
      'The requested chat cannot be found, it has either been deleted or there was an error in loading, please try again',
    );
  }

  return {
    success: true,
    message: 'Chat found!',
    data: {
      chatId: chat._id,
      messages: chat.messages,
      products,
      paymentOption: chat.paymentOption,
    },
  };
};

export const getAllChatsService = async (params: IParams) => {
  const { userId } = params.query;

  const chats = await chatModel.find({ buyerId: userId }).populate('products');

  if (chats.length === 0) {
    throw new BadRequestError('The requested purchase chat does not exist!');
  }

  return {
    success: true,
    message: 'Purchase chats retrieved',
    data: chats,
  };
};

export const getAllAdminChatsService = async (params: IParams) => {
  const { userId } = params.query;

  const chats = await chatModel.find({ sellerId: userId }).populate('products');

  if (chats.length === 0) {
    throw new BadRequestError('The requested purchase chat does not exist!');
  }

  return {
    success: true,
    message: 'Purchase chats retrieved',
    data: chats,
  };
};
