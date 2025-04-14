import { Register } from "./register"

export interface responseRegister {
  statusCode: number;
  statusDescription: string;
  data:Register[]
}
