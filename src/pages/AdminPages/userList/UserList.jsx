import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  // const email = sessionStorage.getItem("email");
  const fetchCustomers = async () => {
    axios({
      method: "GET",
      url: `/api/customer/all`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleDelete = (id) => {
    //here i wiil send a delete product request in the database
    setData(data.filter((item) => item.id !== id));
    const deleteCustomer = async () => {
      axios({
        method: "DELETE",
        url: `/api/customer/${id}`,
        headers: { token: `Bearer ${token}` },
      });
    };
    deleteCustomer();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.image_url} alt="" />
            {params.row.fullname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    //   // renderCell: () => {
    //   //   return (
    //   //     <p>active</p>
    //   //   )
    //   // }
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`user/${params.row.id}`}>
              <button className="userListDetails">Details</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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
