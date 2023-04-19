import * as React from "react";
import { Container } from "@mui/system";
import CustomerRegisterFrom, {
  IProsCustomer,
} from "@/components/customer/customer.register.component";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getCustomerById } from "@/services/CustomerService";

const CustomerRegister: React.FunctionComponent<IProsCustomer> = (props) => {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <CustomerRegisterFrom customer={props.customer} />
      </Container>
    </React.Fragment>
  );
};

export default CustomerRegister;

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
  console.log("\n\n clientId", id);
  let result;

  if (id) {
    result = await getCustomerById(Number(id));
  } else {
    result = {
      clientId: 0,
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
      customer: result,
    },
  };
};
