import "./sellerList.css"; // here need to rename the css
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { sellerRows } from "../../../dummyData"; //here need to add seller info
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
// import { useStateValue } from "../../../utils/StateProvider";

export default function SellerList() {
  // const [{user},dispatch]=useStateValue();
  // const [data, setData] = useState(sellerRows);
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  // const email = sessionStorage.getItem("email");
  const fetchSellers = async () => {
    axios({
      method: "GET",
      url: `/api/seller/all`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setData(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchSellers();
  }, []);

  const handleDelete = (id) => {
    //here i wiil send a delete product request in the database
    setData(data.filter((item) => item.id !== id));
    const deleteSeller = async () => {
      axios({
        method: "DELETE",
        url: `/api/seller/${id}`,
        headers: { token: `Bearer ${token}` },
      });
    };
    deleteSeller();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "seller",
      headerName: "Seller",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="sellerListUser">
            <img className="sellerListImg" src={params.row.image_url} alt="" />
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
            <Link to={`seller/${params.row.id}`}>
              <button className="sellerListDetails">Details</button>
            </Link>
            <DeleteOutline
              className="sellerListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
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
