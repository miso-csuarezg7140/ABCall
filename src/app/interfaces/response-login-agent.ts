import { LoginAgent } from './login-agent';

export interface ResponseLoginAgent {
  statusCode: number;
  statusDescription: string;
  data: {
    token: string;
    type: string;
    refreshToken: string;
    expiresIn: number;
    roles: string[];
    userType: string;
    documentNumber: string;
    documentType: number;
    names: string;
    surnames: string;
  };
}
