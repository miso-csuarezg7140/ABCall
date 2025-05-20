import { LoginAgent } from './login-agent';

export interface ResponseLoginAgent {
  statusCode: number;
  statusDescription: string;
  data: LoginAgent[];
}
