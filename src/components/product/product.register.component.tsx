import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { IProduct } from '@/interface/IProduct';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { ISupplier } from '@/interface/ISupplier';
import { IWarehouse } from '@/interface/IWarehouse';
import { useWarehouse } from '@/hooks/WarehouseContext';
import { createProduct, getSProductById, updateProduct } from '@/services/ProductService';
import { getSuppliers } from '@/services/SupplierService';

export default function ProductRegister() {

  const formRef = React.useRef<FormHandles>(null); 
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
  const [selectValueSupplier, setSelectValueSupplier] = React.useState(0);
  const [selectValueWarehouse, setSelectValueWarehouse] = React.useState(0);
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>();
  const [warehouses, setWarehouses] = React.useState<IWarehouse[]>();  

  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);
  const handleSubmit= React.useCallback( 
    async (data: IProduct) => {
      setOpenLoadding(true);
      if (query.id) {
        await updateProduct(Number(product.productId),
          {
            productId: product.productId,
            name: data.name,
            description: data.description,
            availableQuantity: data.availableQuantity,
            warehouseId: selectValueWarehouse,
            supplierId: selectValueSupplier,
        }
        );
      } else {   
        
        await createProduct(
          {
            ...data, 
            warehouseId: selectValueWarehouse,
            supplierId: selectValueSupplier
          });
      }
      setOpenLoadding(false);
      setOpen(true);
    },
    [query.id, product, selectValueWarehouse, selectValueSupplier],
  );

  const handleBack = async () => {
    router.push('/product');
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/product');
  };


  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getSProductById(Number(query.id));
        if(result){
          setProduct(result);
          setSelectValueSupplier(result.supplierId);
          setSelectValueWarehouse(result.warehouseId);
        }
      }
    };
    validation();
  }, [query, setProduct]);

  const { warehouseList } = useWarehouse();

  const getWarehouseList = React.useCallback(
    async () => {       
      const result1 = await warehouseList();  
      console.log("warehouse mock", result1)    
      setWarehouses(result1);       
    },
    [warehouseList],
  );


  const getSupplierList = React.useCallback(
    async () => {       
      const result1 = await getSuppliers();  
      console.log("suppliers mock", result1)    
      setSuppliers(result1);       
    },
    [],
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
       <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Boa entrega"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              As alterações solicitadas foram aplicadas com êxito em nosso sistema. Agradecemos pela sua atualização e pela confiança em nosso serviço.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              autoFocus
              onClick={handleClose}
            >
              OK
            </Button>  
          </DialogActions>
        </Dialog>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoadding}
          >
          <CircularProgress color="inherit" />
        </Backdrop>         
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