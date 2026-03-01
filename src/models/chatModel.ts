import { Schema, model, Types } from 'mongoose';

const MessageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: 'user',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ChatSchema = new Schema(
  {
    buyerId: {
      type: Types.ObjectId,
      ref: 'user',
    },
    sellerId: {
      type: Types.ObjectId,
      ref: 'user',
    },
    products: [
      {
        type: Types.ObjectId,
        ref: 'products',
      },
    ],
    paymentOption: {
      type: String,
      required: true,
    },

    messages: [MessageSchema],
  },
  { timestamps: true },
);

const chatModel = model('chats', ChatSchema);

export default chatModel;
