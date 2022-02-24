import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomerBio from "../../../components/customerComponents/CustomerBio";
import Orders from "../../../components/customerComponents/Orders";
import axios from "../../../utils/axios";
import "./user.css";

export default function User() {
  // const pathname = window.location.pathname;
  let { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [user_obj, setUser_obj] = useState({});
  const fetchCustomer = async () => {
    axios({
      method: "GET",
      url: `/api/customer/id/${id}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setUser_obj(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchCustomer();
  }, []);
  return (
    <div className="user">
      {/* user info and update block */}

      <div className="userContainer">
        <CustomerBio
          email={user_obj.email}
          fullname={user_obj.fullname}
          username={user_obj.username}
          image_url={user_obj.image_url}
          phone_number={user_obj.phone_number}
          join_date={user_obj.join_date}
        />
      </div>
      <Orders inAdmin="true" customer_id={id} />
    </div>
  );
}
