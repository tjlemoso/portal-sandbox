import { IProduct } from "./../interface/IProduct";
import axiosInstance from "../config/axios/axiosInstance";
import { LINK_PRODUCT_SERVICE } from "@/config/constants";

export async function getProducts() {
  try {
    const response = await axiosInstance.get<IProduct[]>(
      `${LINK_PRODUCT_SERVICE}/product`
    );
    console.log("response getProducts", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(id: number) {
  try {
    const response = await axiosInstance.get<IProduct>(
      `${LINK_PRODUCT_SERVICE}/product/${id}`
    );
    console.log("response getProductById", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createProduct(product: IProduct) {
  try {
    const response = await axiosInstance.post<IProduct>(
      `${LINK_PRODUCT_SERVICE}/product`,
      { ...product }
    );
    console.log("response createProduct", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateProduct(id: number, product: IProduct) {
  try {
    const response = await axiosInstance.put<IProduct>(
      `${LINK_PRODUCT_SERVICE}/product/${id}`,
      { ...product }
    );
    console.log("response updateProduct", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = await axiosInstance.delete(
      `${LINK_PRODUCT_SERVICE}/product/${id}`
    );
    console.log("response deleteProduct", response.data);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}
