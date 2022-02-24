import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";

export default function ProductList() {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  // const email = sessionStorage.getItem("email");
  const fetchProducts = async () => {
    axios({
      method: "GET",
      url: `/api/product/all`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image_url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
 
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "seller_name",
      headerName: "Seller Name",
      width: 120,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"product/" + params.row.id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
