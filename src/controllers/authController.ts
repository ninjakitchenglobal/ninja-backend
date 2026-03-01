//IMPORTING HELPER
import handleRequest from '../helpers/handleRequests';

//IMPORTING SERVICES
import {
  registerService,
  loginService,
  getUserService,
} from '../services/authService';

export const register = handleRequest(registerService);
export const login = handleRequest(loginService);
export const getUser = handleRequest(getUserService);
