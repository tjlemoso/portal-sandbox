import * as React from "react";
import { Container } from "@mui/system";
import WarehouseRegisterForm, {
  IProsWarehouse,
} from "@/components/warehouse/warehouse.register.component";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getSuppliers } from "@/services/SupplierService";
import { getWarehouseById } from "@/services/WarehouseService";

const WarehouseRegister: React.FunctionComponent<IProsWarehouse> = (props) => {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <WarehouseRegisterForm
          warehouse={props.warehouse}
          suppliers={props.suppliers}
        />
      </Container>
    </React.Fragment>
  );
};

export default WarehouseRegister;

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
  console.log("\n\n warehouseId", id);
  let result;

  const suppliersResult = await getSuppliers();

  if (id) {
    result = await getWarehouseById(Number(id));
  } else {
    result = {
      warehouseId: 0,
      name: "",
      phone: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      supplierId: suppliersResult ? suppliersResult[0].supplierId : 0,
    };
  }

  return {
    props: {
      warehouse: result,
      suppliers: suppliersResult,
    },
  };
};
