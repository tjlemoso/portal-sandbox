import * as React from "react";
import SupplierRegisterForm, {
  IProsSupplier,
} from "@/components/supplier/supplier.register.component";
import { Container } from "@mui/system";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getSupplierById } from "@/services/SupplierService";

const SupplierRegister: React.FunctionComponent<IProsSupplier> = (props) => {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <SupplierRegisterForm supplier={props.supplier} />
      </Container>
    </React.Fragment>
  );
};

export default SupplierRegister;

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

  const { id } = ctx.query;
  console.log("\n\n supplierId", id);
  let result;

  if (id) {
    result = await getSupplierById(Number(id));
  } else {
    result = {
      supplierId: 0,
      name: "",
      phone: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    };
  }
  return {
    props: {
      supplier: result,
    },
  };
};
