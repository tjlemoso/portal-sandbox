import { ICustomer } from "../interface/ICustomer";
import axiosInstance from "../config/axios/axiosInstance";
import { LINK_CLIENT_SERVICE } from "@/config/constants";

export async function getCustomers() {
  try {
    const response = await axiosInstance.get<ICustomer[]>(
      `${LINK_CLIENT_SERVICE}/client`
    );
    console.log("response getCustomers", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCustomerById(id: number) {
  try {
    const response = await axiosInstance.get<ICustomer>(
      `${LINK_CLIENT_SERVICE}/client/${id}`
    );
    console.log("response getCustomerById", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createCustomer(client: ICustomer) {
  try {
    const response = await axiosInstance.post<ICustomer>(
      `${LINK_CLIENT_SERVICE}/client`,
      { ...client }
    );
    console.log("response createCustomer", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateCustomer(id: number, client: ICustomer) {
  try {
    const response = await axiosInstance.put<ICustomer>(
      `${LINK_CLIENT_SERVICE}/client/${id}`,
      { ...client }
    );
    console.log("response updateCustomer", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteCustomer(id: number) {
  try {
    const response = await axiosInstance.delete(
      `${LINK_CLIENT_SERVICE}/client/${id}`
    );
    console.log("response updateCustomer", response.data);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}
