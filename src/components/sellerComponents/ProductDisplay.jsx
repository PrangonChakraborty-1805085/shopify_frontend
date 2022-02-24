import React from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 10px;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const ProductImage = styled.img`
  width: 300px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductDescription = styled.div``;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;

const ProductDisplay = ({
  imgsrc,
  name,
  id,
  amount,
  price,
  category,
  description,
  rating,
  offer,
}) => {
  return (
    <Product>
      <ProductDetails>
        <ProductImage src={imgsrc} />
        <Details>

          <ProductId>
            <b>Id: </b>
            {id}
          </ProductId>

          <ProductName>
            <b>Product: </b>
            {name}
          </ProductName>

          {/* <ProductName>
            <b>Category :</b>
            {category}
          </ProductName> */}

          <ProductDescription>
            <b>Stock: :</b>
            {amount}
          </ProductDescription>

          <ProductDescription>
            <b>Price: </b>
            {price}
          </ProductDescription>
           
           {
             rating&& <ProductDescription>
            <b>Rating: :</b>
            {rating}
          </ProductDescription>
           }
           {
             offer&&  <ProductDescription>
            <b>Offer: :</b>
            {offer}
          </ProductDescription>
           }
        
         {
           description&& <ProductDescription>
            <b>Description: :</b>
            {description}
          </ProductDescription>
         }
         

        
        </Details>
      </ProductDetails>
      {/* <PriceDetails>
        <ProductAmountContainer>
          <Add />
          <ProductAmount>{amount}</ProductAmount>
          <Remove />
        </ProductAmountContainer>
        <ProductPrice>$ {price}</ProductPrice>
      </PriceDetails> */}
    </Product>
  );
};

export default ProductDisplay;
