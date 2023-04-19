import * as React from "react";
import { Container } from "@mui/system";
import ProductRegisterForm, {
  IProsProduct,
} from "@/components/product/product.register.component";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getProductById } from "@/services/ProductService";
import { getSuppliers } from "@/services/SupplierService";
import { getWarehouses } from "@/services/WarehouseService";

const ProductRegister: React.FunctionComponent<IProsProduct> = (props) => {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <ProductRegisterForm
          product={props.product}
          suppliers={props.suppliers}
          warehouses={props.warehouses}
        />
      </Container>
    </React.Fragment>
  );
};

export default ProductRegister;

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
  console.log("is produto ", id);
  let productResult;

  const suppliersResult = await getSuppliers();
  const warehousesResult = await getWarehouses();

  if (id) {
    productResult = await getProductById(Number(id));
  } else {
    productResult = {
      productId: 0,
      name: "",
      description: "",
      availableQuantity: 0,
      warehouseId: warehousesResult ? warehousesResult[0].warehouseId : 0,
      supplierId: suppliersResult ? suppliersResult[0].supplierId : 0,
    };
  }

  return {
    props: {
      product: productResult,
      suppliers: suppliersResult,
      warehouses: warehousesResult,
    },
  };
};
