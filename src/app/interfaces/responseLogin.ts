import { Login } from "./Login"

export interface responseLogin {
  statusCode: number;
  statusDescription: string;
  data:Login[]
}
