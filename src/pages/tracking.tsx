import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDeliveryByCode } from '@/services/DeliveryService';
import { IDelivery } from '@/interface/IDelivery';
import { IProduct } from '@/interface/IProduct';
import { ICustomer } from '@/interface/ICustomer';
import { IWarehouse } from '@/interface/IWarehouse';
import { getCustomerById } from '@/services/CustomerService';
import { getSProductById } from '@/services/ProductService';
import { getWarehouseById } from '@/services/WarehouseService';
import { Alert, CircularProgress } from '@mui/material';


const theme = createTheme();

export default function Tracking() {

  const [delivery, setDelivery] = React.useState<IDelivery>();
  const [product, setProduct] = React.useState<IProduct>();
  const [customer, setCustomer] = React.useState<ICustomer>();
  const [warehouse, setWarehouse] = React.useState<IWarehouse>();
  const [deliveryFound, setDeliveryFound] = React.useState<boolean>(false);
  const [findingDelivery, setFindingDelivery] = React.useState<boolean>(false);
  const [ showAlert, setShowAlert] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    setDeliveryFound(false);
    setFindingDelivery(true);
    setShowAlert(false);

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // @ts-ignore
    const code = formData.get('code')?.toString();
    if(code){
        const deliverySearch = await getDeliveryByCode(code);
        if(deliverySearch){
            
            setDeliveryFound(true);
            setDelivery(deliverySearch);

            const customerSearch = await getCustomerById(deliverySearch.clientId);
            setCustomer(customerSearch);

            const productSearch  = await getSProductById(deliverySearch.productId);
            setProduct(productSearch);

            const warehouseSearch  = await getWarehouseById(deliverySearch.warehouseId);
            setWarehouse(warehouseSearch);
        } else{
            setShowAlert(true);
        }
    }

    setFindingDelivery(false);
  };



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-vector/delivery-man-driving-way_637377-123.jpg?w=2000)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid container item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{justifyContent:'center'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Traking
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Tracking Code"
                name="code"
                autoComplete="code"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
                {
                showAlert ?
                (<Alert severity="error">Invalid tracking code!</Alert>)
                : <></>
                }
                {
                findingDelivery ?
                (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                    </Box>
                )
                : <></>
                }
                {
                    deliveryFound ?
                    (        
                        <Grid  spacing={2}>
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom>
                                Tracking Code
                                </Typography>
                                <Typography gutterBottom>{delivery?.trackingCode}</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom >
                                Status
                                </Typography>
                                <Typography gutterBottom>{delivery?.status}</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom >
                                Product
                                </Typography>
                                <Typography gutterBottom>{product?.name}</Typography>
                            </Grid> 
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom >
                                Quantity
                                </Typography>
                                <Typography gutterBottom>{delivery?.quantity}</Typography>
                            </Grid>                                                          
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom >
                                Customer
                                </Typography>
                                <Typography gutterBottom>{`${customer?.name}`}</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom >
                                Origin
                                </Typography>
                                <Typography gutterBottom>{`${warehouse?.name}`}</Typography>
                            </Grid>                                                              
                        </Grid>                                             
                    ): <></>
                }

                {
                    deliveryFound?
                    (
                        <Button             
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { window.location.reload();}}
                      >
                        New Tracking
                      </Button>
                    ) :<></>
                }
                
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}