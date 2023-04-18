import UserTable from "@/components/user/user.table.component";
import { IUser } from "@/interface/IUser";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import router from 'next/router';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useState } from "react";
import {  getUsers } from "@/services/UserService";

interface Props{
  users: IUser[]
}
const UserPage: React.FC<Props> = (props:Props) => {

  const handleSubmit = async () => {
    router.push('/user/register');
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
          Usuários
        </Typography>
      </Container>    
      <Container component="main"  sx={{ mb: 4 }}>        
        <button 
          className="btn btn-success" 
          onClick={handleSubmit}
          >Add
        </button>   
      </Container>     
      <UserTable
        users={props.users}
      />    
    </React.Fragment>    
  );
}

export default UserPage;

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

  const users = await getUsers()
  return {
    props: {
      users
    }
  }
}
