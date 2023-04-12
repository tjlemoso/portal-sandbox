import ProductTable from "@/components/product/product.table.component";
import { useProduct } from "@/hooks/ProductContext";
import { IProduct } from "@/interface/IProduct";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useState } from "react";

const ProductPage: React.FC = () => {

  const [result, setResult] = useState<IProduct[]>();

  const handleSubmit = async () => {
    router.push('/product/register');
  };
  
  const { productList } = useProduct();

  const [openLoadding, setOpenLoadding] = React.useState(true);
  const getProductList = useCallback(
    async () => {       
      const result1 = await productList();      
      setResult(result1);    
      setOpenLoadding(false);       
    },
    [productList],
  );

  useEffect(() => {
    getProductList();
  }, 
  [getProductList]
  );

  return(
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoadding}
        >
        <CircularProgress color="inherit" />
      </Backdrop>        
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
        products={result}
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
  return {
    props: {

    }
  }
}