import ProductTable from "@/components/product/product.table.component";
import { IProduct } from "@/interface/IProduct";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import React from "react";
import { getProducts } from "@/services/ProductService";

interface Props {
  products: IProduct[];
}

const ProductPage: React.FC<Props> = (props:Props) => {

  const handleSubmit = async () => {
    router.push('/product/register');
  };
  
  return(
    <React.Fragment>        
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Products
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <ProductTable
        products={props.products}
      />    
    </React.Fragment>    
  );
}

export default ProductPage;

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

  const products = await getProducts();
  return {
    props: {
      products
    }
  }
}