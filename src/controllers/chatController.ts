import handleRequest from '../helpers/handleRequests';

import {
  createNewChatService,
  getAllChatsService,
  getAllAdminChatsService,
  notifyAdmin,
} from '../services/chatService';

export const getOrCreateNewChat = handleRequest(createNewChatService);
export const getAllChats = handleRequest(getAllChatsService);
export const getAdminChats = handleRequest(getAllAdminChatsService);
export const adminNotification = handleRequest(notifyAdmin);
