import { login } from "./login"

export interface responseLogin {
  statusCode: number;
  statusDescription: string;
  data:login[]
}
