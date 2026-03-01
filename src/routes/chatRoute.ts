import { Router } from 'express';

import {
  getOrCreateNewChat,
  getAllChats,
  getAdminChats,
} from '../controllers/chatController';

const chatRouter = Router();

chatRouter.post('/get-or-create', getOrCreateNewChat);
chatRouter.get('/get-all-chats/:userId', getAllChats);
chatRouter.get('/get-admin-chats/:userId', getAdminChats);

export default chatRouter;
