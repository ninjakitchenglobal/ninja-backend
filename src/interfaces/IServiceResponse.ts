// Standard response interface with generic data type
/* export default interface IServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
 */

type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
};

export type IServiceResponse<T> = SuccessResponse<T> | ErrorResponse;
