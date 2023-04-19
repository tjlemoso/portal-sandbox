import * as React from 'react';
import { Container } from '@mui/system';
import DeliveryRegisterForm, { IProsDelivery } from '@/components/delivery/delivery.register.component';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { getDeliveryById } from '@/services/DeliveryService';
import { getSuppliers } from '@/services/SupplierService';
import { getWarehouses } from '@/services/WarehouseService';
import { getProducts } from '@/services/ProductService';
import { getCustomers } from '@/services/CustomerService';
import { IDelivery } from '@/interface/IDelivery';
import { processManualLocation } from '@/services/MapService';

const DeliveryRegister: React.FunctionComponent<IProsDelivery> = props => {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" >
        <DeliveryRegisterForm 
          delivery={props.delivery} 
          suppliers={props.suppliers}
          warehouses={props.warehouses}
          customers={props.customers}
          products={props.products}
          addressDestiny={props.addressDestiny}
          addressOrigin={props.addressOrigin}
        />
      </Container>
    </React.Fragment>
  );
}

export default DeliveryRegister;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: `/signIn`,
        permanent: false,
      }
    }
  }

  const { id } = ctx.query;
  console.log("is produto ", id);
  let deliveryResult: IDelivery | undefined ;

  const customersResult = await getCustomers();
  const suppliersResult = await getSuppliers(); 
  const warehousesResult = await getWarehouses();  
  const productsResult = await getProducts();

  let addressDestiny = {
    lat: 0,
    lng: 0,
  }

  let addressOrigin = {
    lat: 0,
    lng: 0,
  }

  if(id)
  {
    deliveryResult = await getDeliveryById(Number(id));

    if(deliveryResult && customersResult && warehousesResult){

      const client = customersResult?.find(c => c.clientId === deliveryResult?.clientId);
      console.log("clientAddress",client);
      const clientAddress = await processManualLocation(`${client?.address}${client?.address2}${client?.city}${client?.state}${client?.country}${client?.zip}`);
      addressDestiny = {
        lat: clientAddress?.lat,
        lng: clientAddress?.lng,
      };

      const warehouse = warehousesResult?.find(c => c.warehouseId === deliveryResult?.warehouseId);
      console.log("warehouseAddress",warehouse);
      const warehouseAddress = await processManualLocation(`${warehouse?.address}${warehouse?.address2}${warehouse?.city}${warehouse?.state}${warehouse?.country}${warehouse?.zip}`);
      addressOrigin = {
        lat: warehouseAddress?.lat,
        lng: warehouseAddress?.lng,
      };

    }



  } else {  

    if(customersResult){
      const client = customersResult[0];
      console.log("clientAddress",client);
      const clientAddress = await processManualLocation(`${client?.address}${client?.address2}${client?.city}${client?.state}${client?.country}${client?.zip}`);
      addressDestiny = {
        lat: clientAddress?.lat,
        lng: clientAddress?.lng,
      };
    }


    if(warehousesResult){
      const warehouse = warehousesResult[0];
      console.log("warehouseAddress",warehouse);
      const warehouseAddress = await processManualLocation(`${warehouse?.address}${warehouse?.address2}${warehouse?.city}${warehouse?.state}${warehouse?.country}${warehouse?.zip}`);
      addressOrigin = {
        lat: warehouseAddress?.lat,
        lng: warehouseAddress?.lng,
      };
    }

    deliveryResult =  {
      deliveryId: 0,      
      quantity: 0,
      trackingCode: "",
      status: "",
      clientId: customersResult? customersResult[0].clientId : 0,
      warehouseId: warehousesResult? warehousesResult[0].warehouseId : 0,
      productId: productsResult? productsResult[0].productId : 0,
      supplierId: suppliersResult? suppliersResult[0].supplierId : 0,
    }

  }
  


  return { 
      props : {
        delivery: deliveryResult,
        suppliers: suppliersResult,
        warehouses: warehousesResult,
        customers: customersResult,
        products: productsResult,
        addressDestiny:addressDestiny,
        addressOrigin:addressOrigin,
      }
    };
}
