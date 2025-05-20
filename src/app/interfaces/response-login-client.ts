import { LoginClient } from './login-client';

export interface ResponseLoginClient {
  statusCode: number;
  statusDescription: string;
  data: LoginClient[];
}
