import { LoginClient } from './login-client';

export interface ResponseLoginClient {
  statusCode: number;
  statusDescription: string;
  data: {
    token: string;
    type: string;
    refreshToken: string;
    expiresIn: number;
    roles: string[];
    userType: string;
    clientId: number;
    documentNumber: string;
    socialReason: string;
    email: string;
  };
}
