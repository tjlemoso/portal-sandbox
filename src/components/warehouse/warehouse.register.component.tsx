import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useWarehouse } from '@/hooks/WarehouseContext';
import { IWarehouse } from '@/interface/IWarehouse';
import { useSnackbar } from '@mui/base';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { ISupplier } from '@/interface/ISupplier';
import { useSupplier } from '@/hooks/SupplierContext';

export default function WarehouseRegisterFormComponent() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useWarehouse();
  const { query } = useRouter();
  const [warehouse, setWarehouse] = React.useState<IWarehouse>({} as 
    {
      warehouseId: 0;
      name: "";
      phone: "";
      email: "";
      address: "";
      address2: "";
      city: "";
      state: "";
      zip: "";
      country: "";
      supplierId: 0;
    }
  );
  const [selectValue, setSelectValue] = React.useState(1);
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>();  

  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);
  const handleSubmit= React.useCallback( 
    async (data: IWarehouse) => {
      setOpenLoadding(true);
      if (query.id) {
        await update(Number(warehouse.warehouseId),
          {
          warehouseId: warehouse.warehouseId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          supplierId: selectValue,
        }
        );
      } else {   
        
        await create({...data, supplierId: selectValue});
      }
      setOpenLoadding(false);
      setOpen(true);
    },
    [create, query.id, warehouse.warehouseId, update, selectValue],
  );

  const handleBack = async () => {
    router.push('/warehouse');
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/warehouse');
  };


  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        if(result){
          setWarehouse(result);
          setSelectValue(result.supplierId);
        }
      }
    };
    validation();
  }, [query, getById, setWarehouse]);

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
  }, 
  [getSupplierList]
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
                Warehouse
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={warehouse?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Phone Number</label>
              <Input name="phone" 
                autoComplete="family-name"
                defaultValue={warehouse?.phone}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Email</label>
              <Input name="email" 
                autoComplete="family-name"
                defaultValue={warehouse?.email}
                />
            </Grid>

            <Grid item xs={12} style={{display: 'grid'}}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Supplier
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Supplier</label>
              <select value={selectValue} onChange={e => setSelectValue(Number(e.target.value))}>
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
                Address
                </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 1</label>
                <Input name="address" 
                  autoComplete="family-name"
                  defaultValue={warehouse?.address}
                  />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 2</label>
                <Input name="address2" 
                  autoComplete="family-name"
                  defaultValue={warehouse?.address2}                  
                  />
            </Grid>        
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>City</label>
              <Input name="city" 
                autoComplete="family-name"
                defaultValue={warehouse?.city}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>State/Province/Region</label>
              <Input name="state" 
                autoComplete="family-name"
                defaultValue={warehouse?.state}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Zip / Postal code</label>
              <Input name="zip" 
                autoComplete="family-name"
                defaultValue={warehouse?.zip}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Country</label>
              <Input name="country" 
                autoComplete="family-name"
                defaultValue={warehouse?.country}                
                />
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