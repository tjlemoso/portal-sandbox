import React from "react";
import { ISupplier } from "../../interface/ISupplier";
import Container from '@mui/material/Container';
import { useSupplier } from "@/hooks/SupplierContext";
import router from "next/router";

interface IProps {
  suppliers: ISupplier[] | undefined;
}

const SupplierTable: React.FunctionComponent<IProps> = props => {

  const { remove } = useSupplier();

  const handleDelete= React.useCallback( 
    async (id : number) => {
      console.log("id", id);
      remove(id);
      router.reload();
    },
    [remove],
  );

  return (
    <Container component="main"  sx={{ mb: 4 }}>
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.suppliers && props.suppliers.length > 0 ? (
            props.suppliers.map(i => (
              <tr key={i.supplierId}>
                <td>{i["name"]}</td>
                <td>{i["phone"]}</td>
                <td>{i["email"]}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleDelete(i.supplierId)}>edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(i.supplierId)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no suppliers</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </Container>
  );
};
export default SupplierTable;
