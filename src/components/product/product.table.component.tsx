import React from "react";
import { IProduct } from "../../interface/IProduct";
import Container from '@mui/material/Container';
import { useProduct } from "@/hooks/ProductContext";
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
  products: IProduct[] | undefined;
}

function Row(props: { row: IProduct }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { remove } = useProduct();

  const handleEdit = async (id : number) => {
    router.push(`/product/register?id=${id}`);
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
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.availableQuantity}</TableCell>
        <TableCell align="left">
          <button className="btn btn-primary" onClick={() => handleEdit(row.productId)}>edit</button>              
          <button className="btn btn-danger" onClick={() => handleDelete(row.productId)}>delete</button>          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const ProductTable: React.FunctionComponent<IProps> = props => {

  return (
    <Container component="main" >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell>Action</TableCell>       
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.products && props.products.length > 0 ? 
                (
                  props.products.map((row) => (
                    <Row key={row.name} row={row} />
                  ))
                ):
                (
                  <tr>
                    <td colSpan={3}>no product</td>
                  </tr>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default ProductTable;
