import React from "react";
import Footer from "../../components/customerComponents/Footer";
import Navbar from "../../components/customerComponents/Navbar";
import NewProduct from "../AdminPages/newProduct/NewProduct";
import styled from "styled-components";

const Container = styled.div``;
const NewProductContainer=styled.div`
 width:100vw;
 height:90vh;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const SellerNewProduct = () => {
  return (
    <Container>
      <Navbar />
      <NewProductContainer>
        <NewProduct />
      </NewProductContainer>
      <Footer />
    </Container>
  );
};

export default SellerNewProduct;
