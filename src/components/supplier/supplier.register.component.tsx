import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from '../Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import router, { useRouter } from 'next/router';
import { useSupplier } from '@/hooks/SupplierContext';
import { ISupplier } from '@/interface/ISupplier';
import { useSnackbar } from '@mui/base';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';

export default function SupplierRegister() {

  const formRef = React.useRef<FormHandles>(null); 
  const { create, getById, update } = useSupplier();
  const { query } = useRouter();
  const [supplier, setSupplier] = React.useState<ISupplier>({} as 
    {
      supplierId: 0;
      name: "";
      phone: "";
      email: "";
      address: "";
      address2: "";
      city: "";
      state: "";
      zip: "";
      country: "";
    }
  );

  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);

  const handleSubmit= React.useCallback( 
    async (data: ISupplier) => {

      setOpenLoadding(true);

      if (query.id) {
        await update(Number(supplier.supplierId),
          {
          supplierId: supplier.supplierId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        }
        );
      } else{        
        await create({...data});
      }

      setOpenLoadding(false);
      setOpen(true);
    },
    [create, query.id, supplier.supplierId, update],
  );

  const handleClose = () => {
    setOpen(false);
    router.push('/supplier');
  };

  const handleBack = async () => {
    router.push('/supplier');
  };

  React.useEffect(() => {
    async function validation() {
      if (query.id) {
        const result = await getById(Number(query.id));
        if(result){
          setSupplier(result);
        }
      }
    };
    validation();
  }, [query, getById, setSupplier]);


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
                Supplier
              </Typography>
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Name</label>
              <Input name="name" 
                autoComplete="family-name"
                defaultValue={supplier?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Phone Number</label>
              <Input name="phone" 
                autoComplete="family-name"
                defaultValue={supplier?.phone}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Email</label>
              <Input name="email" 
                autoComplete="family-name"
                defaultValue={supplier?.email}
                />
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
                  defaultValue={supplier?.address}
                  />
            </Grid>
            <Grid item xs={12} style={{display: 'grid'}}>
              <label>Address line 2</label>
                <Input name="address2" 
                  autoComplete="family-name"
                  defaultValue={supplier?.address2}                  
                  />
            </Grid>        
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>City</label>
              <Input name="city" 
                autoComplete="family-name"
                defaultValue={supplier?.city}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>State/Province/Region</label>
              <Input name="state" 
                autoComplete="family-name"
                defaultValue={supplier?.state}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Zip / Postal code</label>
              <Input name="zip" 
                autoComplete="family-name"
                defaultValue={supplier?.zip}                
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{display: 'grid'}}>
              <label>Country</label>
              <Input name="country" 
                autoComplete="family-name"
                defaultValue={supplier?.country}                
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