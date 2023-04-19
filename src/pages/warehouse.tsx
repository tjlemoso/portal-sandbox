import WarehouseTable from "@/components/warehouse/warehouse.table.component";
import { IWarehouse } from "@/interface/IWarehouse";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from "next/router";
import React from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getWarehouses } from "@/services/WarehouseService";

interface Props {
  warehouses: IWarehouse[];
}
const WarehousePage: React.FC<Props> = (props: Props) => {
  const handleSubmit = async () => {
    router.push("/warehouse/register");
  };

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Depósitos
        </Typography>
      </Container>
      <Container component="main" sx={{ mb: 4 }}>
        <button className="btn btn-success" onClick={handleSubmit}>
          Add
        </button>
      </Container>
      <WarehouseTable warehouses={props.warehouses} />
    </React.Fragment>
  );
};

export default WarehousePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: `/signIn`,
        permanent: false,
      },
    };
  }

  const warehouses = await getWarehouses();
  return {
    props: {
      warehouses,
    },
  };
};
