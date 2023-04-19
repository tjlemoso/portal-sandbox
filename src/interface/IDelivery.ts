export interface IDelivery {
  deliveryId: number;
  quantity: number;
  trackingCode: string;
  status: string;
  clientId: number;
  warehouseId: number;
  productId: number;
  supplierId: number;
}
