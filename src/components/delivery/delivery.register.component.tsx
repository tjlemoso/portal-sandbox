import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { IDelivery } from '@/interface/IDelivery';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { ISupplier } from '@/interface/ISupplier';
import { IWarehouse } from '@/interface/IWarehouse';
import { IProduct } from '@/interface/IProduct';
import { ICustomer } from '@/interface/ICustomer';
import Map from '../Map';
import { processManualLocation } from '@/services/MapService';
import { getCustomerById, getCustomers } from '@/services/CustomerService';
import { createDelivery, getDeliveryById, updateDelivery } from '@/services/DeliveryService';
import { getProducts } from '@/services/ProductService';
import { getSuppliers } from '@/services/SupplierService';
import { getWarehouseById, getWarehouses } from '@/services/WarehouseService';
import AlertDialog from '../share/message';
import SimpleBackdrop from '../share/backdrop';

export interface IProsDelivery {
  delivery: IDelivery,
  suppliers: ISupplier[],
  warehouses: IWarehouse[],
  customers: ICustomer[],
  products: IProduct[],
  addressDestiny:google.maps.LatLngLiteral,
  addressOrigin:google.maps.LatLngLiteral,

}

const DeliveryRegisterForm: React.FunctionComponent<IProsDelivery> = props => {

  const formRef = React.useRef<FormHandles>(null); 
  const { query } = useRouter();

  const [delivery, setDelivery] = React.useState<IDelivery>(props.delivery);
  const [selectValueSupplier, setSelectValueSupplier] = React.useState(props.delivery.supplierId);
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>(props.suppliers);

  const [selectValueWarehouse, setSelectValueWarehouse] = React.useState(props.delivery.warehouseId);
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>(props.warehouses);  

  const [selectValueProduct, setSelectValueProduct] = React.useState(props.delivery.productId);
  const [products, setProduct] = React.useState<IProduct[]>(props.products); 

  const [selectValueCustomer, setSelectValueCustomer] = React.useState(props.delivery.clientId);
  const [clients, setCustomer] = React.useState<ICustomer[]>(props.customers); 

  const [addressOrigin, setAddressOrigin] = React.useState<google.maps.LatLngLiteral>(props.addressOrigin);
  const [addressDestiny, setAddressDestiny] = React.useState<google.maps.LatLngLiteral>(props.addressDestiny);

  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);
  const handleSubmit= React.useCallback( 
    async (data: IDelivery) => {

      setOpenLoadding(true);
      if (query.id) {
        await updateDelivery(Number(delivery.deliveryId),
          {
            deliveryId: delivery.deliveryId,
            quantity: data.quantity,
            trackingCode: data.trackingCode,
            status: data.status,
            clientId: selectValueCustomer,
            warehouseId: selectValueWarehouse,
            productId: selectValueProduct,
            supplierId: selectValueSupplier,
        }
        );
      } else {   
        
        await createDelivery(
          {
            ...data, 
            clientId: selectValueCustomer,
            warehouseId: selectValueWarehouse,
            productId: selectValueProduct,
            supplierId: selectValueSupplier,
          });
      }

      setOpenLoadding(false);
      setOpen(true);

    },
    [query.id, delivery, selectValueWarehouse, selectValueSupplier, selectValueCustomer, selectValueProduct],
  );

  const handleGetLocationCustomer = async (clientId: number) => {
    setSelectValueCustomer(clientId);

    const client = clients?.find(c => c.clientId === clientId);
    console.log("clientAddress",client);
    const clientAddress = await processManualLocation(`${client?.address}${client?.address2}${client?.city}${client?.state}${client?.country}${client?.zip}`);
    setAddressDestiny({
      lat: clientAddress?.lat,
      lng: clientAddress?.lng,
    });
    setAddressOrigin({
      lat: 0,
      lng: 0,
    });

  };

  const handleGetLocationWarehouse = async (warehouseId: number) => {
    setSelectValueWarehouse(warehouseId);

    const warehouse = warehouses?.find(c => c.warehouseId === warehouseId);
    const warehouseAddress = await processManualLocation(`${warehouse?.address}${warehouse?.address2}${warehouse?.city}${warehouse?.state}${warehouse?.country}${warehouse?.zip}`);
    setAddressOrigin({
      lat: warehouseAddress?.lat,
      lng: warehouseAddress?.lng,
    });

  };

  const handleBack = async () => {
    router.push('/delivery');
  };
      
  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <AlertDialog openDialog={open} handleClose={handleBack}/>
        <SimpleBackdrop openComponent={openLoadding} />         
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={1}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Entrega
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Status</label>
              <Input name="status" 
                autoComplete="family-name"
                defaultValue={delivery?.status}
                />
            </Grid> 

            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Código de Rastreio</label>
              <Input name="trackingCode" 
                autoComplete="family-name"
                defaultValue={delivery?.trackingCode}
                />
            </Grid>

            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Cliente</label>
              <select value={selectValueCustomer} onChange={e => handleGetLocationCustomer(Number(e.target.value))}>
              {
                clients && clients.length > 0 ? 
                  (
                    clients.map((item, index) => (
                      <option 
                        value={item.clientId}
                        key={item.clientId}
                        >
                        {item.name}
                      </option>
                    )) 
                  ) : 
                  (
                    <option 
                    value={0}
                    key={0}
                    >
                  0
                  </option>
                  )
            }        
              </select>
            </Grid>

            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Produto</label>
              <select value={selectValueProduct} onChange={e => setSelectValueProduct(Number(e.target.value))} style={{ width: '100%'}}>
              {
                products && products.length > 0 ? 
                  (
                    products.map((item, index) => (
                      <option 
                        value={item.productId}
                        key={item.productId}
                        >
                        {item.name}
                      </option>
                    )) 
                  ) : 
                  (
                    <option 
                    value={0}
                    key={0}
                    >
                   0
                  </option>
                  )
            }        
            </select>
            </Grid>

            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Quantidade</label>
              <Input name="quantity" 
                autoComplete="family-name"
                defaultValue={delivery?.quantity}
                style={{ width: '100%'}}
                />
            </Grid> 
            
            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Fornecedor</label>
              <select value={selectValueSupplier} onChange={e => setSelectValueSupplier(Number(e.target.value))}>
              {
                suppliers && suppliers.length > 0 ? 
                  (
                    suppliers.map((item, index) => (
                      <option 
                        value={item.supplierId}
                        key={item.supplierId}
                        >
                        {item.name}
                      </option>
                    )) 
                  ) : 
                  (
                    <option 
                    value={0}
                    key={0}
                    >
                   0
                  </option>
                  )
            }        
            </select>
            </Grid>

            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Depósito</label>
              <select value={selectValueWarehouse} onChange={e => handleGetLocationWarehouse(Number(e.target.value))}>
              {
                warehouses && warehouses.length > 0 ? 
                  (
                    warehouses.map((item, index) => (
                      <option 
                        value={item.warehouseId}
                        key={item.warehouseId}
                        >
                        {item.name}
                      </option>
                    )) 
                  ) : 
                  (
                    <option 
                    value={0}
                    key={0}
                    >
                   0
                  </option>
                  )
            }        
            </select>
            </Grid> 

            <Grid item xs={12}>
              <Map addressOrigin={addressOrigin} addressDestiny={addressDestiny}/>
            </Grid>

            <Grid item xs={12} style={{display: 'grid'}}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin:1 }}>                
                  <Button  sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
                    Voltar
                  </Button>        
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                   Confirmar
                  </Button>          
              </Box>
            </Grid>  
          </Grid>        
        </Form>
      </Paper>
    </Container>
  );
}

export default DeliveryRegisterForm;