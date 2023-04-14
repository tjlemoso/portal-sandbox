import * as React from 'react';
import { Container } from '@mui/system';
import UserRegister from '@/components/user/user.register.component';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

export default function AddressForm() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <UserRegister />
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['token']: token } = parseCookies(ctx);


  if (!token) {
    return {
      redirect: {
        destination: `/signIn`,
        permanent: false,
      }
    }
  }
  return {
    props: {

    }
  }
}
