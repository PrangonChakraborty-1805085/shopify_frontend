import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Announcement from "../../components/customerComponents/Announcement";
import Footer from "../../components/customerComponents/Footer";
import Navbar from "../../components/customerComponents/Navbar";
import CartProduct from "../../components/customerComponents/CartProduct";
import {useStateValue} from '../../utils/StateProvider';
import {Link, useNavigate} from 'react-router-dom'
import axios from '../../utils/axios'

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;
const ContinueButton = styled(TopButton)`
  background-color: transparent;
`;
const CheckoutNowButton = styled(TopButton)`
  border: none;
  background-color: black;
  color: white;
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductInfo = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius:10px;
  padding:20px;
  height:50vh;
`;
const SummaryTitle=styled.h1`
 font-weight: 200;
`;
const SummaryItem=styled.div`
margin:30px 0px;
display:flex;
justify-content: space-between;
`;
const SummaryItemTotal=styled(SummaryItem)`
 font-weight:500;
 font-size:24px;
`;
const SummaryItemText=styled.span``;
const SummaryItemPrice=styled.span``;

const Button=styled.button`
 width:100%;
 padding:10px;
 background-color:black;
 color:white;
 font-weight:600;
 cursor:pointer;
`;

const Cart = () => {
  const [{user,basket},dispatch]=useStateValue();
  const token=sessionStorage.getItem("token");
  const[amount_total,setamount_total]=useState(0);
  const navigate=useNavigate();

  const calcSubtotal=()=>{
    let total=0;
    basket?.map((product,index)=>{
      let price=product.price;
      let offer=product.offer;
      let quantity=product.amount;
      total=total+((price-(price*(offer/100)))*quantity);
    })
    setamount_total(total);
  }
    useEffect(() => {
      calcSubtotal();
 },[basket]);


  const handleCheckout=(e)=>{
   //now send checkout request
   e.preventDefault();
   let customer_id=sessionStorage.getItem("id");
   customer_id=Number(customer_id);
   const stock_ids=[];
   const quantities=[];
   basket?.map((product,index)=>{
      stock_ids.push(Number(product.id));
      quantities.push(Number(product.amount));
   });
   axios({
      method: "POST",
      url: `/api/customer/${customer_id}/checkout`,
      headers: { token: `Bearer ${token}` },
      data:{ 
        customer_id:customer_id,
         stock_id:stock_ids,
         quantity:quantities,
      }
    }).then((res) => {
      // redirect to orders history page
      dispatch({
        type:'EMPTY_BASKET'
      })
      navigate("/orders", {replace: true});
    },(err)=>{
      alert(err.response.data);
    });
  };
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to="/">
          <ContinueButton>CONTINUE SHOPPING</ContinueButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({basket?.length})</TopText>
            {/* <TopText>Your Wishlist(0)</TopText> */}
            {/* Here 2 is the number of products and 0 is wishlist in the cart which will be defined by redux and
                     will be dynamic..but for now it is static..it will be controlled by State
                     see the amazon clone for using state globally */}
          </TopTexts>
          <CheckoutNowButton onClick={handleCheckout}>CHECKOUT NOW</CheckoutNowButton>
        </Top>
        <Bottom>
          <ProductInfo>
          {
            basket?.map((cartProduct,index)=>
             <CartProduct
                key={index}
                id={cartProduct.id}
                imgsrc={cartProduct.image_url}
                name={cartProduct.name}
                amount={cartProduct.amount}
                stock={cartProduct.stock}
                description={cartProduct.description}
                price={cartProduct.price}
                offer={cartProduct.offer}
                hideamounchange="false"
             />
            )
          }
          </ProductInfo>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {amount_total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItemTotal>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {amount_total}</SummaryItemPrice>
            </SummaryItemTotal>
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
