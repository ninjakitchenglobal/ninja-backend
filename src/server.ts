import app from './app';
import http from 'http';
import connectDB from './db/db';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import chatModel from './models/chatModel';
import userModel from './models/userModel';
import transporter from './types/nodemailer_transporter';
import { newMessageAlert } from './types/emails/emailTemplates';
import { BadRequestError } from './errors';

dotenv.config();

export let httpServer: http.Server;
export let io: Server;

export const serverMain = async () => {
  try {
    //INTIALISING SERVER AND PORT
    httpServer = http.createServer(app);
    const PORT = process.env.PORT || 3000;

    //INITIALISING SOCKET.IO
    io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    //SOCKET EVENTS
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);

      socket.on('join-chat', (chatId: string) => {
        socket.join(chatId);
      });

      socket.on('send-message', async ({ chatId, senderId, text }) => {
        const chat = await chatModel.findById(chatId);

        if (!chat) {
          throw new BadRequestError('No chat found');
        }

        if (senderId === chat?.sellerId) {
          const receiver = await userModel.findById(chat?.buyerId);

          if (!receiver) {
            console.log('No receiver where sender is ninja');
            return socket.emit(
              'error',
              'Receiver not found where sender is ninja',
            );
          }

          const newEmailInfo = newMessageAlert(receiver.email);
          transporter.sendMail(newEmailInfo, (error, info) => {
            if (error) {
              console.error('Email error:', error);
              return;
            }
          });
        } else {
          const receiver = await userModel.findById(chat?.sellerId);

          if (!receiver) {
            console.log('No receiver');
            return socket.emit('error', 'Receiver not found');
          }

          const newEmailInfo = newMessageAlert(receiver.email!);
          transporter.sendMail(newEmailInfo, (error, info) => {
            if (error) {
              throw new BadRequestError(
                `Error sending email: ${JSON.stringify(error)}`,
              );
            }
          });
        }

        const message = { senderId, text };
        chat.messages.push(message);
        await chat.save();

        io.to(chatId).emit('receive-message', message);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });
    //CONNECTING TO DATABASE
    if (!process.env.MONGO_URI) {
      throw new Error('Database error: Absent URI');
    }
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected!');

    //STARTING SERVER
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

export const serverDown = (callback: any) => {
  httpServer && httpServer.close(callback);
};

serverMain();
