import { IWarehouse } from './../interface/IWarehouse';
import axiosInstance from '../config/axios/axiosInstance';

export async function get() {
  try {
    // const response = await axiosInstance.get<IWarehouse[]>('/warehouse');
    // console.log('response', response.data);
    return [
      {
      "warehouseId": 8,
      "createData": null,
      "name": "DE OLIVEIRA",
      "phone": "DE OLIVEIRA",
      "email": "DE OLIVEIRA",
      "address": "DE OLIVEIRA",
      "address2": "DE OLIVEIRA",
      "city": "DE OLIVEIRA",
      "state": "DE OLIVEIRA",
      "zip": "DE OLIVEIRA",
      "country": "DE OLIVEIRA",
      "supplierId": 2
      },
      {
      "warehouseId": 7,
      "createData": null,
      "name": "teste ",
      "phone": "teste ",
      "email": "teste ",
      "address": "teste ",
      "address2": "teste ",
      "city": "teste ",
      "state": "teste ",
      "zip": "teste ",
      "country": "teste ",
      "supplierId": 5
      },
      {
      "warehouseId": 1,
      "createData": "2023-07-03",
      "name": "warehouse 1",
      "phone": "1-518-497-2615",
      "email": "nec.tempus.mauris@google.edu",
      "address": "7559 Arcu. Road",
      "address2": null,
      "city": "Oaxaca",
      "state": null,
      "zip": "458807",
      "country": "South Korea",
      "supplierId": 1
      },
      {
      "warehouseId": 2,
      "createData": "2023-07-03",
      "name": "warehouse 2",
      "phone": "(323) 671-5151",
      "email": "nec.ante.maecenas@icloud.edu",
      "address": "P.O. Box 103, 3728 Nulla Street",
      "address2": null,
      "city": "Cartago",
      "state": null,
      "zip": "36307",
      "country": "United Kingdom",
      "supplierId": 2
      },
      {
      "warehouseId": 3,
      "createData": "2023-07-03",
      "name": "warehouse 3",
      "phone": "(778) 976-4073",
      "email": "praesent.eu@yahoo.com",
      "address": "322-4355 Purus, Avenue",
      "address2": null,
      "city": "Cusco",
      "state": null,
      "zip": "66045-318",
      "country": "United States",
      "supplierId": 3
      },
      {
      "warehouseId": 4,
      "createData": "2023-07-03",
      "name": "warehouse 4",
      "phone": "1-331-637-3103",
      "email": "pellentesque.tincidunt@hotmail.edu",
      "address": "625-5656 Sagittis. Av.",
      "address2": null,
      "city": "Campania",
      "state": null,
      "zip": "432281",
      "country": "Singapore",
      "supplierId": 4
      },
      {
      "warehouseId": 5,
      "createData": "2023-07-03",
      "name": "warehouse 5",
      "phone": "(906) 127-6238",
      "email": "netus.et@aol.com",
      "address": "P.O. Box 385, 8395 Nisi St.",
      "address2": null,
      "city": "Soccsksargen",
      "state": null,
      "zip": "1609",
      "country": "India",
      "supplierId": 5
      }
      ];
  } catch(err) {
    console.error(err);
  }
}

export async function getSingle(id: number) {
  try {
    const response = await axiosInstance.get<IWarehouse>(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function post(warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.post<IWarehouse>('/warehouse',{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function put(id: number, warehouse: IWarehouse) {
  try {
    const response = await axiosInstance.put<IWarehouse>(`/warehouse/${id}`,{...warehouse});
    console.log('response', response.data);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}

export async function del (id: number) {
  try {
    const response = await axiosInstance.delete(`/warehouse/${id}`);
    console.log('response', response.data);
    return response.status;
  } catch(err) {
    console.error(err);
  }
}