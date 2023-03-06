import SupplierTable from "@/components/supplier/supplier.table.component";
import { useSupplier } from "@/hooks/SupplierContext";
import { ISupplier } from "@/interface/ISupplier";
import router from 'next/router';
import { useCallback, useEffect, useState } from "react";

const SupplierPage: React.FC = () => {

  const [result, setResult] = useState<ISupplier[]>();

  const handleSubmit = async () => {
    router.push('/supplier/register');
  };
  
  const { supplierList } = useSupplier();

  const getSupplierList = useCallback(
    async () => {       
      const result1 = await supplierList();      
      setResult(result1);       
    },
    [supplierList],
  );

  useEffect(() => {
    getSupplierList();
  }, 
  [getSupplierList]
  );

  return(
    <div>
      <h3 className="text-center">Supplier List</h3>
      <div style={{marginInline:50}}>
        <button className="btn btn-success" onClick={handleSubmit}>Add</button>
      </div>
      <div>
        <SupplierTable
          suppliers={result}
        />
      </div>
    </div>
  );
}

export default SupplierPage;