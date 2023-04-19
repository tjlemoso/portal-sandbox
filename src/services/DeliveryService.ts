import { IDelivery } from "./../interface/IDelivery";
import axiosInstance from "../config/axios/axiosInstance";
import { LINK_DELIVERY_SERVICE } from "@/config/constants";

export async function getDeliveries() {
  try {
    const response = await axiosInstance.get<IDelivery[]>(
      `${LINK_DELIVERY_SERVICE}/delivery`
    );
    console.log("response getDeliveries", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getDeliveryById(id: number) {
  try {
    const response = await axiosInstance.get<IDelivery>(
      `${LINK_DELIVERY_SERVICE}/delivery/${id}`
    );
    console.log("response getDeliveryById", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createDelivery(delivery: IDelivery) {
  try {
    const response = await axiosInstance.post<IDelivery>(
      `${LINK_DELIVERY_SERVICE}/delivery`,
      { ...delivery }
    );
    console.log("response createDelivery", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateDelivery(id: number, delivery: IDelivery) {
  try {
    const response = await axiosInstance.put<IDelivery>(
      `${LINK_DELIVERY_SERVICE}/delivery/${id}`,
      { ...delivery }
    );
    console.log("response updateDelivery", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteDelivery(id: number) {
  try {
    const response = await axiosInstance.delete(
      `${LINK_DELIVERY_SERVICE}/delivery/${id}`
    );
    console.log("response deleteDelivery", response.data);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}

export async function getDeliveryByCode(code: string) {
  try {
    const response = await axiosInstance.get<IDelivery>(
      `${LINK_DELIVERY_SERVICE}/delivery/tracking/${code}`
    );
    console.log("response getDeliveryByCode", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
