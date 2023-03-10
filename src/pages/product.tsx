import ProductTable from "@/components/product/product.table.component";
import { useProduct } from "@/hooks/ProductContext";
import { IProduct } from "@/interface/IProduct";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import React, { useCallback, useEffect, useState } from "react";

const ProductPage: React.FC = () => {

  const [result, setResult] = useState<IProduct[]>();

  const handleSubmit = async () => {
    router.push('/product/register');
  };
  
  const { productList } = useProduct();

  const getProductList = useCallback(
    async () => {       
      const result1 = await productList();      
      setResult(result1);       
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