import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useDelivery } from '@/hooks/DeliveryContext';
import { IDelivery } from '@/interface/IDelivery';
import { useSnackbar } from '@mui/base';
import { Paper, Typography } from '@mui/material';
import { ISupplier } from '@/interface/ISupplier';
import { useSupplier } from '@/hooks/SupplierContext';
import { IWarehouse } from '@/interface/IWarehouse';
import { useWarehouse } from '@/hooks/WarehouseContext';
import { IProduct } from '@/interface/IProduct';
import { IClient } from '@/interface/IClient';
import { useProduct } from '@/hooks/ProductContext';
import { useClient } from '@/hooks/ClientContext';
import MapPage from '@/pages/map';
import Map from '../Map';
// import Map from '../Map';

export default function DeliveryRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useDelivery();
  const { query } = useRouter();
  const [delivery, setDelivery] = React.useState<IDelivery>({} as 
    {
      deliveryId: 0,
      name: "",
      quantity: 0,
      trackingCode: "",
      status: "",
      clientId: 0,
      warehouseId: 0,
      productId: 0,
      supplierId: 0
    }
  );
  const [selectValueSupplier, setSelectValueSupplier] = React.useState(1);
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>();

  const [selectValueWarehouse, setSelectValueWarehouse] = React.useState(1);
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>();  

  const [selectValueProduct, setSelectValueProduct] = React.useState(1);
  const [products, setProduct] = React.useState<IProduct[]>(); 

  const [selectValueClient, setSelectValueClient] = React.useState(1);
  const [clients, setClient] = React.useState<IClient[]>(); 

  const handleSubmit= React.useCallback( 
    async (data: IDelivery) => {
      // if (query.id) {
      //   update(Number(delivery.deliveryId),
      //     {
      //       deliveryId: delivery.deliveryId,
      //       name: delivery.name,
      //       quantity: delivery.quantity,
      //       trackingCode: delivery.trackingCode,
      //       status: delivery.status,
      //       clientId: selectValueClient,
      //       warehouseId: selectValueWarehouse,
      //       productId: selectValueProduct,
      //       supplierId: selectValueSupplier,
      //   }
      //   );
      // } else {   
        
      //   create(
      //     {
      //       ...data, 
      //       clientId: selectValueClient,
      //       warehouseId: selectValueWarehouse,
      //       productId: selectValueProduct,
      //       supplierId: selectValueSupplier,
      //     });
      // }
      // router.push('/delivery');
    },
    [create, query.id, delivery, update, selectValueWarehouse, selectValueSupplier, selectValueClient, selectValueProduct ],
  );

  const handleBack = async () => {
    router.push('/delivery');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setDelivery(result);
        setSelectValueSupplier(result.supplierId);
        setSelectValueWarehouse(result.warehouseId);
      }
    };
    validation();
  }, [query, getById, setDelivery]);

  const { warehouseList } = useWarehouse();

  const getWarehouseList = React.useCallback(
    async () => {       
      const result1 = await warehouseList();  
      console.log("warehouse mock", result1)    
      setWarehouses(result1);       
    },
    [warehouseList],
  );

  const { supplierList } = useSupplier();

  const getSupplierList = React.useCallback(
    async () => {       
      const result1 = await supplierList();  
      console.log("suppliers mock", result1)    
      setSuppliers(result1);       
    },
    [supplierList],
  );

  const { productList } = useProduct();

  const getProductList = React.useCallback(
    async () => {       
      const result1 = await productList();  
      console.log("productList mock", result1)    
      setProduct(result1);       
    },
    [productList],
  );

  const { clientList } = useClient();

  const getClientList = React.useCallback(
    async () => {       
      const result1 = await clientList();  
      console.log("clientList mock", result1)    
      setClient(result1);       
    },
    [clientList],
  );

  React.useEffect(() => {
    getSupplierList();
    getWarehouseList();
    getProductList();
    getClientList();
  }, 
  [getSupplierList, getWarehouseList, getProductList, getClientList]
  );

  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Delivery
              </Typography>
            </Grid>
   
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Client</label>
              <select value={selectValueClient} onChange={e => setSelectValueClient(Number(e.target.value))}>
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
              <label>Product</label>
              <select value={selectValueProduct} onChange={e => setSelectValueProduct(Number(e.target.value))}>
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
              <label>Quantity</label>
              <Input name="quantity" 
                autoComplete="family-name"
                defaultValue={delivery?.quantity}
                />
            </Grid> 
            
            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Supplier</label>
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
              <label>Warehouse</label>
              <select value={selectValueWarehouse} onChange={e => setSelectValueWarehouse(Number(e.target.value))}>
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



            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Status</label>
              <Input name="status" 
                autoComplete="family-name"
                defaultValue={delivery?.status}
                />
            </Grid> 

            <Grid item xs={6} style={{display: 'grid'}}>
              <label>Tracking Code</label>
              <Input name="trackingCode" 
                autoComplete="family-name"
                defaultValue={delivery?.trackingCode}
                />
            </Grid> 

            <Grid item xs={12} style={{display: 'grid'}}>
              <Map/>
            </Grid>

            {/* <Grid item xs={12} style={{display: 'grid'}}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin:1 }}>                
                  <Button  sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
                    Back
                  </Button>        
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Register
                  </Button>          
                </Box>
            </Grid>   */}
          </Grid>        
        </Form>
      </Paper>
    </Container>
  );
}