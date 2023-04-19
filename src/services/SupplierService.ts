import { ISupplier } from "./../interface/ISupplier";
import axiosInstance from "../config/axios/axiosInstance";
import { LINK_SUPPLIER_SERVICE } from "@/config/constants";

export async function getSuppliers() {
  try {
    const response = await axiosInstance.get<ISupplier[]>(
      `${LINK_SUPPLIER_SERVICE}/supplier`
    );
    console.log("response getSuppliers ", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getSupplierById(id: number) {
  try {
    const response = await axiosInstance.get<ISupplier>(
      `${LINK_SUPPLIER_SERVICE}/supplier/${id}`
    );
    console.log("response getSupplierById", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createSupplier(supplier: ISupplier) {
  try {
    const response = await axiosInstance.post<ISupplier>(
      `${LINK_SUPPLIER_SERVICE}/supplier`,
      { ...supplier }
    );
    console.log("response createSupplier", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateSupplier(id: number, supplier: ISupplier) {
  try {
    const response = await axiosInstance.put<ISupplier>(
      `${LINK_SUPPLIER_SERVICE}/supplier/${id}`,
      { ...supplier }
    );
    console.log("response updateSupplier", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteSupplier(id: number) {
  try {
    const response = await axiosInstance.delete(
      `${LINK_SUPPLIER_SERVICE}/supplier/${id}`
    );
    console.log("response deleteSupplier", response.data);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}
