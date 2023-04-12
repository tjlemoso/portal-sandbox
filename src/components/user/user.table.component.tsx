import React from "react";
import { IUser } from "../../interface/IUser";
import Container from '@mui/material/Container';
import { useUser } from "@/hooks/UserContext";
import router from "next/router";
import { Paper } from "@mui/material";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IProps {
  users: IUser[] | undefined;
}

function Row(props: { row: IUser }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { remove } = useUser();

  const handleEdit = async (id : number) => {
    router.push(`/user/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      await remove(id);
      router.reload();
    },
    [remove],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.isAdmin? "Admin" : "Worker"}
        </TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.userId)}>edit</button>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.userId)}>delete</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const UserTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Is Admin</TableCell>
              <TableCell>Action</TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.users && props.users.length > 0 ? 
                (
                  props.users.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no user</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default UserTable;
