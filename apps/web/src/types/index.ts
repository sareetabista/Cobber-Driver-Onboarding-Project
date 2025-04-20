import { AxiosError } from "axios";

export interface BaseErrorFormat {
  message: string;
  error: string[];
  statusCode: number;
  success: boolean;
}

export interface BaseAxiosErrorFormat extends AxiosError<BaseErrorFormat> {}
