import * as React from "react";
import Grid from "@mui/material/Grid";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from "../Input";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import router, { useRouter } from "next/router";
import { IWarehouse } from "@/interface/IWarehouse";
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
import { ISupplier } from "@/interface/ISupplier";
import {
  createWarehouse,
  getWarehouseById,
  updateWarehouse,
} from "@/services/WarehouseService";
import { getSuppliers } from "@/services/SupplierService";
import AlertDialog from "../share/message";
import SimpleBackdrop from "../share/backdrop";

export interface IProsWarehouse {
  warehouse: IWarehouse;
  suppliers: ISupplier[];
}

const WarehouseRegisterForm: React.FunctionComponent<IProsWarehouse> = (
  props
) => {
  const formRef = React.useRef<FormHandles>(null);
  const { query } = useRouter();
  const [warehouse, setWarehouse] = React.useState<IWarehouse>(props.warehouse);
  const [selectValue, setSelectValue] = React.useState(
    props.warehouse.supplierId
  );
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>(
    props.suppliers
  );

  const [open, setOpen] = React.useState(false);
  const [openLoadding, setOpenLoadding] = React.useState(false);
  const handleSubmit = React.useCallback(
    async (data: IWarehouse) => {
      setOpenLoadding(true);
      console.log("selectValue", selectValue);
      if (query.id) {
        await updateWarehouse(Number(warehouse.warehouseId), {
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
        });
      } else {
        await createWarehouse({ ...data, supplierId: selectValue });
      }
      setOpenLoadding(false);
      setOpen(true);
    },
    [query.id, warehouse.warehouseId, selectValue]
  );

  const handleBack = async () => {
    router.push("/warehouse");
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
                Depósito
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Nome</label>
              <Input
                name="name"
                autoComplete="family-name"
                defaultValue={warehouse?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Telefone</label>
              <Input
                name="phone"
                autoComplete="family-name"
                defaultValue={warehouse?.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Email</label>
              <Input
                name="email"
                autoComplete="family-name"
                defaultValue={warehouse?.email}
              />
            </Grid>

            <Grid item xs={12} style={{ display: "grid" }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Fornecedor
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Fornecedor</label>
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(Number(e.target.value))}
              >
                {suppliers && suppliers.length > 0 ? (
                  suppliers.map((item, index) => (
                    <option value={item.supplierId} key={item.supplierId}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value={0} key={0}>
                    0
                  </option>
                )}
              </select>
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
                defaultValue={warehouse?.address}
              />
            </Grid>
            <Grid item xs={12} style={{ display: "grid" }}>
              <label>Complemento</label>
              <Input
                name="address2"
                autoComplete="family-name"
                defaultValue={warehouse?.address2}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Cidade</label>
              <Input
                name="city"
                autoComplete="family-name"
                defaultValue={warehouse?.city}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Estado</label>
              <Input
                name="state"
                autoComplete="family-name"
                defaultValue={warehouse?.state}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>Código postal</label>
              <Input
                name="zip"
                autoComplete="family-name"
                defaultValue={warehouse?.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: "grid" }}>
              <label>País</label>
              <Input
                name="country"
                autoComplete="family-name"
                defaultValue={warehouse?.country}
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

export default WarehouseRegisterForm;
