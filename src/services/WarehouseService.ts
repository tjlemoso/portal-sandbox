import { IWarehouse } from "./../interface/IWarehouse";
import axiosInstance from "../config/axios/axiosInstance";
import { LINK_WAREHOUSE_SERVICE } from "@/config/constants";

export async function getWarehouses() {
  try {
    const response = await axiosInstance.get<IWarehouse[]>(
      `${LINK_WAREHOUSE_SERVICE}/warehouse`
    );
    console.log("response getWarehouses", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getWarehouseById(id: number) {
  try {
    const response = await axiosInstance.get<IWarehouse>(
      `${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`
    );
    console.log("response getWarehouseById", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createWarehouse(warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.post<IWarehouse>(
      `${LINK_WAREHOUSE_SERVICE}/warehouse`,
      { ...warehouse }
    );
    console.log("response createWarehouse", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateWarehouse(id: number, warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.put<IWarehouse>(
      `${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`,
      { ...warehouse }
    );
    console.log("response updateWarehouse", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteWarehouse(id: number) {
  try {
    const response = await axiosInstance.delete(
      `${LINK_WAREHOUSE_SERVICE}/warehouse/${id}`
    );
    console.log("response deleteWarehouse", response.data);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}
