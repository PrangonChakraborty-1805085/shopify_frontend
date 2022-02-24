
import '../AdminPages/seller_list/sellerList.css'
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function Transactions() {
  
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchAll = async () => {
    axios({
      method: "GET",
      url: `/api/user/transaction/all`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setData(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchAll();
  }, []);

  const columns = [
    { field: "id", headerName: "Transaction ID", width: 90 },
    {
        field: "customer",
        headerName: "Customer",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="sellerListUser">
              <img className="sellerListImg" src={params.row.customer_image_url} alt="" />
              {params.row.customer_name}
            </div>
          );
        },
      },
    {
      field: "seller",
      headerName: "Seller",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="sellerListUser">
            <img className="sellerListImg" src={params.row.seller_image_url} alt="" />
            {params.row.seller_name}
          </div>
        );
      },
    },
    
    {
      field: "amount",
      headerName: "Transaction Volume",
      width: 160,
    },
    { field: "transaction_date", headerName: "Date", width: 200 }
  ];

  return (
    <div className="sellerList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
