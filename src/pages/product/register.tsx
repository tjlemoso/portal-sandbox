import * as React from 'react';
import { Container } from '@mui/system';
import ProductRegister from '@/components/product/product.register.component';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

export default function Form() {

  return (
    <React.Fragment>
      <Container disableGutters maxWidth="sm" component="main">
        <ProductRegister />
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