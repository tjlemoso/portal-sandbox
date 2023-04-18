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
import { createProduct, getSProductById, updateProduct } from '@/services/ProductService';
import { getSuppliers } from '@/services/SupplierService';
import { getWarehouses } from '@/services/WarehouseService';
import AlertDialog from '../share/message';
import SimpleBackdrop from '../share/backdrop';

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
        setOpenLoadding(true);
        const result = await getSProductById(Number(query.id));
        if(result){
          setProduct(result);
          setSelectValueSupplier(result.supplierId);
          setSelectValueWarehouse(result.warehouseId);
        }
        setOpenLoadding(false);
      }
    };
    validation();
  }, [query, setProduct]);


  const getWarehouseList = React.useCallback(
    async () => {       
      const result1 = await getWarehouses();  
      console.log("warehouse mock", result1)    
      setWarehouses(result1);       
    },
    [],
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
       <AlertDialog openDialog={open} handleClose={handleBack}/>
        <SimpleBackdrop openComponent={openLoadding} />          
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>          
            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Produto
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Nome</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={product?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Descrição</label>
              <Input name="description" 
                autoComplete="family-name"
                defaultValue={product?.description}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Quantidade</label>
              <Input name="availableQuantity" 
                autoComplete="family-name"
                defaultValue={product?.availableQuantity}
                />
            </Grid>

            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Fornecedor
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
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

            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Depósito
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Depósito</label>
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