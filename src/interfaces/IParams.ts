export default interface IParams<T = any, Q = any, U = any> {
  data: T;
  query: Q;
  user: U;
}
