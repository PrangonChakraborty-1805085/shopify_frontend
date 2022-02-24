import React from "react";
import moment from "moment";
import CartProduct from "../customerComponents/CartProduct";
import CurrencyFormat from "react-currency-format";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  margin: 20px 0px;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;
`;
const Order__id = styled.p`
  position: absolute;
  top: 40px;
  right: 20px;
`;
const Order__total = styled.h3`
  font-weight: 500;
  text-align: right;
`;
const Order_date=styled.h3`
 margin-top:10px;
 margin-bottom:10px;
`
function Order({ order }) {
  return (
    <Container>
      <h2>Order</h2>
      {/* <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p> */}
      <Order_date>{order.order_date}</Order_date>
      <Order__id>
        {/* <small>{order.id}</small> */}
        <small>{order.order_id}</small>
      </Order__id>
      <CartProduct
        imgsrc={order.image_url}
        name={order.name}
        id={order.stock_id}
        amount={order.quantity}
        price={order.price}
        hidePlusMinus="true"
        description={order.description}
         offer={order.offer}
         category={order.category}
      />
      <CurrencyFormat
        renderText={(value) => (
          <Order__total>Order Total: {value}</Order__total>
        )}
        decimalScale={2}
        // value={order.data.amount / 100}
        value={(order.price - (order.price * (order.offer / 100))) * order.quantity}
        displayType="text"
        thousandSeparator={true}
        prefix={"$"}
      />
    </Container>
  );
}
export default Order;
