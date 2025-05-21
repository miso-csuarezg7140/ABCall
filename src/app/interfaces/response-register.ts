import { Register } from "./register"

export interface ResponseRegister {
  statusCode: number;
  statusDescription: string;
  data:Register[]
}