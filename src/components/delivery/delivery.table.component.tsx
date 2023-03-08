import React from "react";
import { IDelivery } from "../../interface/IDelivery";
import Container from '@mui/material/Container';
import { useDelivery } from "@/hooks/DeliveryContext";
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
  deliverys: IDelivery[] | undefined;
}

function Row(props: { row: IDelivery }) {
  const { row } = props;
  const { remove } = useDelivery();

  const handleEdit = async (id : number) => {
    router.push(`/delivery/register?id=${id}`);
  };

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      remove(id);
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
        <TableCell align="left">{row.trackingCode}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.deliveryId)}>edit</button>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.deliveryId)}>delete</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const DeliveryTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.deliverys && props.deliverys.length > 0 ? 
                (
                  props.deliverys.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no delivery</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default DeliveryTable;
