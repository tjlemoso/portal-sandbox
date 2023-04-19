import * as React from "react";
import Grid from "@mui/material/Grid";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Input from "../Input";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import router, { useRouter } from "next/router";
import { ICustomer } from "@/interface/ICustomer";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "@/services/CustomerService";
import AlertDialog from "../share/message";
import SimpleBackdrop from "../share/backdrop";

export interface IProsCustomer {
  customer: ICustomer;
}

const CustomerRegisterForm: React.FunctionComponent<IProsCustomer> = (
  props
) => {
  const formRef = React.useRef<FormHandles>(null);
  const { query } = useRouter();
  const [customer, setCustomer] = React.useState<ICustomer>(props.customer);
  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);
  const handleSubmit = React.useCallback(
    async (data: ICustomer) => {
      setOpenLoadding(true);

      if (query.id) {
        await updateCustomer(Number(customer.clientId), {
          clientId: customer.clientId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
        });
      } else {
        await createCustomer({ ...data });
      }

      setOpenLoadding(false);
      setOpen(true);
    },
    [query.id, customer.clientId]
  );

  const handleBack = async () => {
    router.push("/customer");
  };

  return (
    <Container component="main">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <AlertDialog openDialog={open} handleClose={handleBack} />
        <SimpleBackdrop openComponent={openLoadding} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ display: "grid" }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Cliente
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Nome</label>
              <Input
                name="name"
                autoComplete="family-name"
                defaultValue={customer?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Telefone</label>
              <Input
                name="phone"
                autoComplete="family-name"
                defaultValue={customer?.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Email</label>
              <Input
                name="email"
                autoComplete="family-name"
                defaultValue={customer?.email}
              />
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Endereço
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Endereço</label>
              <Input
                name="address"
                autoComplete="family-name"
                defaultValue={customer?.address}
              />
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Complemento</label>
              <Input
                name="address2"
                autoComplete="family-name"
                defaultValue={customer?.address2}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Cidade</label>
              <Input
                name="city"
                autoComplete="family-name"
                defaultValue={customer?.city}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Estado</label>
              <Input
                name="state"
                autoComplete="family-name"
                defaultValue={customer?.state}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Código postal</label>
              <Input
                name="zip"
                autoComplete="family-name"
                defaultValue={customer?.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>País</label>
              <Input
                name="country"
                autoComplete="family-name"
                defaultValue={customer?.country}
              />
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}
              >
                <Button sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
                  Voltar
                </Button>
                <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
                  Confirmar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  );
};

export default CustomerRegisterForm;
