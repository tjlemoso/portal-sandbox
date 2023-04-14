import CustomerTable from "@/components/customer/customer.table.component";
import { ICustomer } from "@/interface/ICustomer";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { getCustomers } from '../services/CustomerService';

interface Props {
  customers: ICustomer[];
}

const CustomerPage: React.FC<Props> = (props:Props) => {

  const handleSubmit = async () => {
    router.push('/customer/register');
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
          Customers
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <CustomerTable
        customers={props.customers}
      />    
    </React.Fragment>    
  );
}

export default CustomerPage;

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

  const customers = await getCustomers();      
  return {
    props: {
      customers
    }
  }

}
