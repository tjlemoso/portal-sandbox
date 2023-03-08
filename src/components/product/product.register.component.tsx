import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useProduct } from '@/hooks/ProductContext';
import { IProduct } from '@/interface/IProduct';
import { useSnackbar } from '@mui/base';
import { Paper, Typography } from '@mui/material';
import { ISupplier } from '@/interface/ISupplier';
import { useSupplier } from '@/hooks/SupplierContext';
import { IWarehouse } from '@/interface/IWarehouse';
import { useWarehouse } from '@/hooks/WarehouseContext';

export default function ProductRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useProduct();
  const { query } = useRouter();
  const [product, setProduct] = React.useState<IProduct>({} as 
    {
      productId: 0,
      name: "",
      description: "",
      availableQuantity: 0,
      warehouseId: 0,
      supplierId: 0,
    }
  );
  const [selectValueSupplier, setSelectValueSupplier] = React.useState(1);
  const [selectValueWarehouse, setSelectValueWarehouse] = React.useState(1);
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>();
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>();  

  const handleSubmit= React.useCallback( 
    async (data: IProduct) => {
      if (query.id) {
        update(Number(product.productId),
          {
            productId: product.productId,
            name: product.name,
            description: product.description,
            availableQuantity: product.availableQuantity,
            warehouseId: selectValueWarehouse,
            supplierId: selectValueSupplier,
        }
        );
      } else {   
        
        create(
          {
            ...data, 
            warehouseId: selectValueWarehouse,
            supplierId: selectValueSupplier
          });
      }
      router.push('/product');
    },
    [create, query.id, product, update, selectValueWarehouse, selectValueSupplier ],
  );

  const handleBack = async () => {
    router.push('/product');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        setProduct(result);
        setSelectValueSupplier(result.supplierId);
        setSelectValueWarehouse(result.warehouseId);
      }
    };
    validation();
  }, [query, getById, setProduct]);

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

  React.useEffect(() => {
    getSupplierList();
    getWarehouseList();
  }, 
  [getSupplierList, getWarehouseList]
  );

  return (
    <Container component="main">
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Product
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={product?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Description</label>
              <Input name="description" 
                autoComplete="family-name"
                defaultValue={product?.description}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Quantity</label>
              <Input name="availableQuantity" 
                autoComplete="family-name"
                defaultValue={product?.availableQuantity}
                />
            </Grid>

            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Supplier
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
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

            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Warehouse
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
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

            <Grid item xs={12} style={{display: 'grid'}}>
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
            </Grid>  
          </Grid>        
        </Form>
      </Paper>
    </Container>
  );
}