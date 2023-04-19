import * as React from "react";
import { Container } from "@mui/system";
import UserRegisterForm, {
  IProsUser,
} from "@/components/user/user.register.component";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getUserById } from "@/services/UserService";

const UserRegister: React.FunctionComponent<IProsUser> = (props) => {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <UserRegisterForm user={props.user} />
      </Container>
    </React.Fragment>
  );
};

export default UserRegister;

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
  console.log("\n\n userId", id);
  let result;

  if (id) {
    result = await getUserById(Number(id));
  } else {
    result = {
      userId: 0,
      name: "",
      password: "",
      isAdmin: false,
    };
  }

  return {
    props: {
      user: result,
    },
  };
};
