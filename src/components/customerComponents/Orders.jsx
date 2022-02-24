import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
// import "./Orders.css";
// import { useStateValue } from "./StateProvider";
import Order from "./Order";
import styled from "styled-components";
// import { orders } from "../../dummyData";

const Container = styled.div`
  padding: 20px 80px;
`;
const Container_h1 = styled.h1`
  margin: 10px 0px 20px 4px;
`;
const Container_order = styled.div``;

function Orders({ inAdmin,customer_id }) {

  const token=sessionStorage.getItem("token");
  const [orders,setorders]=useState([]);
  const fetchOrders = async () => {
    axios({
      method: "GET",
      url: `/api/customer/${customer_id}/orders`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setorders(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(()=>{
    fetchOrders();
  },[]);
  return (
    <Container>
      {inAdmin && <Container_h1>Orders</Container_h1>}
      {!inAdmin && <Container_h1>Your orders</Container_h1>}
      <Container_order>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </Container_order>
    </Container>
  );
}
export default Orders;
