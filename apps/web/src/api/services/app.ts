import { User } from "@/types";
import axiosInstance from "../instance";

export interface BasicDetailsFormInterface {
  fullname: string;
  phone: string;
  vehicleDetails: {
    name: string;
    number: string;
    model: string;
    type: string;
    license_type: string;
  };
  abn_number: string;
  fair_pay: string;
  hours_commitment: string;
  days_commitment: string;
  willing_to_move_large_goods: string;
  start_date: string;
}

export const basicDetailsForm = async (payload: BasicDetailsFormInterface) => {
  const response = await axiosInstance.patch("/user/submit-form", payload);
  return response;
};

export const uploadDocuments = async (payload: FormData) => {
  const response = await axiosInstance.patch("/user/upload-doc", payload);
  return response;
};

export const uploadSignature = async (payload: FormData) => {
  const response = await axiosInstance.patch("/user/upload-signature", payload);
  return response;
};

export const getDriverDetails: () => Promise<User> = async () => {
  const response = await axiosInstance.get("/user/driver-details");
  return response.data;
};
