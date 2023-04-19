import SupplierTable from "@/components/supplier/supplier.table.component";
import { ISupplier } from "@/interface/ISupplier";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from "next/router";
import React from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getSuppliers } from "@/services/SupplierService";

interface Props {
  suppliers: ISupplier[];
}

const SupplierPage: React.FC<Props> = (props: Props) => {
  const handleSubmit = async () => {
    router.push("/supplier/register");
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
          Fornecedores
        </Typography>
      </Container>
      <Container component="main" sx={{ mb: 4 }}>
        <button className="btn btn-success" onClick={handleSubmit}>
          Add
        </button>
      </Container>
      <SupplierTable suppliers={props.suppliers} />
    </React.Fragment>
  );
};

export default SupplierPage;

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

  const suppliers = await getSuppliers();
  return {
    props: {
      suppliers,
    },
  };
};
