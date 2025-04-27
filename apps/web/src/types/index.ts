import { AxiosError } from "axios";

export interface BaseErrorFormat {
  message: string;
  error: string[];
  statusCode: number;
  success: boolean;
}

export interface VehicleDetails {
  name: string;
  model: string;
  number: string;
}

export interface User {
  _id: string;
  email: string;
  status: "not_started" | "in_progress" | "completed"; // adjust based on all possible statuses
  role: "driver" | "admin" | "user"; // adjust based on roles
  reminder_mail_count: number;
  completed_mail_sent: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  abn_file: string; // URL to the file
  license: string; // URL to the file
  abn_number: string;
  fullname: string;
  vehicleDetails: VehicleDetails;
  signature: string; // URL to the file
  signature_time: string; // ISO date string
  phone: string;
  insurance_certificate: string; // filename
}

export interface BaseAxiosErrorFormat extends AxiosError<BaseErrorFormat> {}
