import React from "react";
import styled from "styled-components";
import Navbar from "../../components/customerComponents/Navbar";
import Newsletter from "../../components/customerComponents/Newsletter";
import Orders from "../../components/customerComponents/Orders";

const Container = styled.div``;
const OrderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const OrderTitle = styled.h1``;
const OrderContainer = styled.div``;

const OrdersPage = () => {
  const customer_id=sessionStorage.getItem("id");
  return (
    <Container>
      <Navbar />
      <OrderContainer>
        <Orders inAdmin="false" customer_id={customer_id} />
      </OrderContainer>
      <Newsletter />
    </Container>
  );
};

export default OrdersPage;
