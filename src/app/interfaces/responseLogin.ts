import { Login } from './login';

export interface responseLogin {
  statusCode: number;
  statusDescription: string;
  data: Login[];
}
