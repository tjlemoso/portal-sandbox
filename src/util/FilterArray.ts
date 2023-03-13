import { IWarehouse } from "@/interface/IWarehouse";

export function filterWarehouseBySupplierID (warehouses: IWarehouse[], supplierId: number){
  return warehouses.filter((filter) => filter.supplierId === supplierId);
}