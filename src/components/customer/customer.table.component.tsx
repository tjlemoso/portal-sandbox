import React from "react";
import { ICustomer } from "../../interface/ICustomer";
import Container from '@mui/material/Container';
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
import { deleteCustomer } from "@/services/CustomerService";

interface IProps {
  customers: ICustomer[] | undefined;
}

function Row(props: { row: ICustomer }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleEdit = async (id : number) => {
    router.push(`/customer/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      await deleteCustomer(id);
      router.reload();
    },
    [],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.clientId)}>edit</button>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.clientId)}>delete</button>          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Address
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Address line 1</TableCell>
                    <TableCell>Address line 2</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Zip</TableCell>
                    <TableCell align="left">Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>              
                  <TableRow key={row.address}>
                    <TableCell component="th" scope="row">
                      {row.address}
                    </TableCell>
                    <TableCell>{row.address2}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                    <TableCell align="left">{row.zip}</TableCell>
                    <TableCell align="left">{row.country}</TableCell>
                  </TableRow>                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>      
      </TableRow>
    </React.Fragment>
  );
}



const CustomerTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.customers && props.customers.length > 0 ? 
                (
                  props.customers.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no customers</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default CustomerTable;
