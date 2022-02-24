import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Navbar from "../../components/customerComponents/Navbar";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import '../AdminPages/seller_list/sellerList.css';

const Container = styled.div`
/* display:flex;
flex-direction: column; */
`;

const DeliveryHome = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const fetchOrders = async () => {
    axios({
      method: "GET",
      url: `/api/user/allOrders`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setData(res.data);
      // setData(data?.map((row,index)=>({
      //     id:index+1,
      //     ...row,
      // })));
      console.log(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchOrders();
  }, []);
//   const handleOrder = (id) => {
//     //here i wiil send a handle order request in the database
//     setData(data.filter((item) => item.id !== id));
//     const putOrder = async () => {
//       axios({
//         method: "POST",
//         url: `/api/user/order/${id}`,
//         headers: { token: `Bearer ${token}` },
//       });
//     };
//     putOrder();
//   };
//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },

//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//       renderCell: (params) => {
//         return <p>Pending</p>;
//       },
//     },
//        {
//       field: "order_date",
//       headerName: "Date",
//       width: 120,
//     //   renderCell: (params) => {
//     //     return <p>Pending</p>;
//     //   },
//     },
//     // {
//     //   field: "action",
//     //   headerName: "Action",
//     //   width: 150,
//     //   renderCell: (params) => {
//     //     return (
//     //       <>
//     //         <button className="sellerListDetails">Deliver</button>
//     //         {/* <DeleteOutline
//     //           className="sellerListDelete"
//     //           onClick={() => handleOrder(params.row.id)}
//     //         /> */}
//     //         {/* <Checkbox
//     //           {...label}
//     //           defaultChecked
//     //           onClick={() => handleOrder(params.row.id)}
//     //           sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
//     //         /> */}
//     //       </>
//     //     );
//     //   },
//     // },
//   ];
//   return (
//     <Container>
//       <Navbar />
//       <div className="sellerList">
//         <DataGrid
//           rows={data}
//           disableSelectionOnClick
//           columns={columns}
//           pageSize={10}
//           checkboxSelection
//         />
//       </div>
//     </Container>
//   );
// };
const columns = [
    { field: "id", headerName: "Transaction ID", width: 90 },
    // {
    //     field: "customer",
    //     headerName: "Customer",
    //     width: 200,
    //     renderCell: (params) => {
    //       return (
    //         <div className="sellerListUser">
    //           <img className="sellerListImg" src={params.row.customer_image_url} alt="" />
    //           {params.row.customer_name}
    //         </div>
    //       );
    //     },
    //   },
    // {
    //   field: "seller",
    //   headerName: "Seller",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="sellerListUser">
    //         <img className="sellerListImg" src={params.row.seller_image_url} alt="" />
    //         {params.row.seller_name}
    //       </div>
    //     );
    //   },
    // },
    
    // {
    //   field: "amount",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    // { field: "transaction_date", headerName: "Date", width: 200 }
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
export default DeliveryHome;
